import requests
from fastapi import HTTPException, APIRouter
from pydantic import BaseModel

AUTH_API_URL = "https://web.socem.plymouth.ac.uk/COMP2001/auth/api/users"

class UserCredentials(BaseModel):
    username: str
    password: str

auth_router = APIRouter()

@auth_router.post("/login")
def login(credentials: UserCredentials):
    response = requests.post(f"{AUTH_API_URL}/login", json=credentials.dict())
    if response.status_code == 200:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid response from authentication server")
    raise HTTPException(status_code=response.status_code, detail=response.text)