import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core import config
from app.api.endpoints import router
from app.services.predictor import load_model_file

# Set up logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("obesight-api")

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
    lifespan=lifespan
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the endpoints router
app.include_router(router)

@app.get("/", summary="Root Welcome Endpoint")
def read_root():
    return {
        "message": f"Welcome to {config.APP_NAME}",
        "docs_url": "/docs",
        "health_url": "/api/v1/health"
    }
