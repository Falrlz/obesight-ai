import logging
import warnings

def get_logger(name: str) -> logging.Logger:
    """
    Get a configured logger instance.
    """
    # Suppress all python warnings and noisy third-party loggers globally
    warnings.filterwarnings("ignore")
    logging.getLogger("mlflow").setLevel(logging.ERROR)
    logging.getLogger("urllib3").setLevel(logging.ERROR)
    
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        formatter = logging.Formatter('[%(levelname)s] %(message)s')
        
        ch = logging.StreamHandler()
        ch.setFormatter(formatter)
        logger.addHandler(ch)
        
    return logger


