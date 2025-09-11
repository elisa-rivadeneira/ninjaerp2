from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Project Info
    PROJECT_NAME: str = "NinjaERP"
    PROJECT_DESCRIPTION: str = "Sistema ERP Ninja para Industria Minera y Metalmecánica"
    VERSION: str = "1.0.0"
    DOMAIN: str = "ninjaerp.com"
    
    # Database
    DATABASE_URL: str = "postgresql://ninjaerp_user:ninja_secure_2024@localhost:5432/ninjaerp_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str = "ninjaerp-super-secure-key-2024-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
