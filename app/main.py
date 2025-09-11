from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Crear aplicación FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEBUG else [f"https://{settings.DOMAIN}"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": f"🥷 Bienvenido a {settings.PROJECT_NAME}",
        "description": settings.PROJECT_DESCRIPTION,
        "version": settings.VERSION,
        "domain": settings.DOMAIN,
        "docs": "/docs",
        "status": "🟢 Sistema operativo"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "NinjaERP Core",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }
