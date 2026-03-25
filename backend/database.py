from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime, timezone

# SQLite database file stored inside the backend directory
DATABASE_URL = "sqlite:///./potatoshield.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # Required for SQLite with FastAPI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ──────────────────────────────────────────
# ORM Models
# ──────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id              = Column(Integer, primary_key=True, index=True)
    username        = Column(String, unique=True, index=True, nullable=False)
    email           = Column(String, unique=True, index=True, nullable=True)  # from Google OAuth
    hashed_password = Column(String, nullable=True)   # NULL for Google-only accounts
    google_id       = Column(String, unique=True, nullable=True)
    avatar_url      = Column(String, nullable=True)   # Google profile picture
    created_at      = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    analyses = relationship("AnalysisHistory", back_populates="user", cascade="all, delete-orphan")


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id            = Column(Integer, primary_key=True, index=True)
    user_id       = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_name    = Column(String, nullable=True)
    result_class  = Column(String, nullable=False)
    confidence    = Column(Float, nullable=False)
    timestamp     = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="analyses")


# ──────────────────────────────────────────
# DB Dependency (for FastAPI)
# ──────────────────────────────────────────

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Create all tables if they don't exist yet."""
    Base.metadata.create_all(bind=engine)
