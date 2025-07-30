from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import onboarding  # example router

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(onboarding.router)

@app.get("/")
def root():
    return {"message": "Welcome to Rafiki Backend"}
