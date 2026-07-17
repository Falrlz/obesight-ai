import logging
import time
from collections import defaultdict
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core import config
from app.api.endpoints import router
from app.services.predictor import load_model_file

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("obesight-api")

# Simple In-Memory Rate Limiting for CPU-heavy ML inference
RATE_LIMIT_DURATION = 60  # seconds
RATE_LIMIT_REQUESTS = 10  # requests allowed per client IP within duration
request_history = defaultdict(list)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage the lifespan of the application:
    1. Loads the ML model pipeline into memory at startup.
    2. Clears state on shutdown.
    """
    logger.info("Initializing app: Loading machine learning model...")
    try:
        model = load_model_file(config.MODEL_PATH)
        app.state.model = model
        logger.info(f"Model successfully loaded from: {config.MODEL_PATH}")
    except Exception as e:
        logger.critical(
            f"FATAL: Failed to load machine learning model from {config.MODEL_PATH}. "
            f"Error: {str(e)}"
        )
        # We assign None to app.state.model so endpoints will return 503 instead of crashing during startup
        app.state.model = None

    yield

    logger.info("Shutting down app: Cleaning up states...")
    if hasattr(app.state, "model"):
        del app.state.model

app = FastAPI(
    title=config.APP_NAME,
    description="Stateless Inference API for Obesity Prediction and Health Recommendations",
    version="1.0.0",
    debug=config.DEBUG,
    docs_url="/docs" if config.DEBUG else None,
    redoc_url="/redoc" if config.DEBUG else None,
    lifespan=lifespan
)

# Configure CORS middleware (restricting HTTP methods)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Middleware: Add Secure Response Headers and Rate Limiting
@app.middleware("http")
async def security_and_rate_limit_middleware(request: Request, call_next):
    # 1. Rate Limiting for POST /api/v1/predict endpoint
    if request.url.path == "/api/v1/predict" and request.method == "POST":
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        
        # Clean history entries older than the rate limit duration window
        request_history[client_ip] = [t for t in request_history[client_ip] if now - t < RATE_LIMIT_DURATION]
        
        if len(request_history[client_ip]) >= RATE_LIMIT_REQUESTS:
            logger.warning(f"Rate limit exceeded for IP: {client_ip}")
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "Too many requests. Please try again after a minute."
                }
            )
        request_history[client_ip].append(now)

    # 2. Process Request
    response = await call_next(request)

    # 3. Inject Security Headers
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'"
    
    return response

# Include the endpoints router
app.include_router(router)

@app.get("/", summary="Root Welcome Endpoint")
def read_root():
    return {
        "message": f"Welcome to {config.APP_NAME}",
        "docs_url": "/docs" if config.DEBUG else None,
        "health_url": "/api/v1/health"
    }
