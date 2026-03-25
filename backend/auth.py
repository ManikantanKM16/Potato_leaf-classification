import os
import httpx
from datetime import datetime, timedelta, timezone
from typing import Optional
from pathlib import Path

from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv

# Load .env from the same folder as this file (works regardless of where uvicorn is launched from)
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

# ──────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────
SECRET_KEY        = os.getenv("SECRET_KEY", "fallback-dev-secret-do-not-use-in-production-32x")
ALGORITHM         = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

GOOGLE_CLIENT_ID     = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
FRONTEND_URL         = os.getenv("FRONTEND_URL", "http://localhost:5173")

GOOGLE_TOKEN_URL  = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

import bcrypt

# ──────────────────────────────────────────
# Password Hashing
# ──────────────────────────────────────────

def hash_password(password: str) -> str:
    # bcrypt 5.0.0+ requires bytes. hashpw returns bytes, we decode to store as string.
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'), 
            hashed_password.encode('utf-8')
        )
    except Exception:
        return False


# ──────────────────────────────────────────
# JWT Tokens
# ──────────────────────────────────────────

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


# ──────────────────────────────────────────
# Google OAuth Helpers
# ──────────────────────────────────────────

async def exchange_google_code(code: str, redirect_uri: str) -> Optional[dict]:
    """Exchange a Google authorization code for user profile info."""
    async with httpx.AsyncClient() as client:
        # Step 1: Exchange code for tokens
        token_resp = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            },
            timeout=10.0,
        )
        if token_resp.status_code != 200:
            return None

        tokens = token_resp.json()
        access_token = tokens.get("access_token")
        if not access_token:
            return None

        # Step 2: Fetch user profile
        userinfo_resp = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=10.0,
        )
        if userinfo_resp.status_code != 200:
            return None

        return userinfo_resp.json()


def get_google_oauth_url(redirect_uri: str, state: str = "") -> str:
    """Build the Google OAuth consent URL."""
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "select_account",
        "state": state,
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"https://accounts.google.com/o/oauth2/v2/auth?{query}"
