from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx
import os

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
MURF_API_KEY = os.getenv("MURF_API_KEY")

app = FastAPI()

# Setup static directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def read_index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

# Request + Response Models
class TTSRequest(BaseModel):
    text: str
    voice_id: str = "en-US-natalie"

class TTSResponse(BaseModel):
    audio_url: str

MURF_ENDPOINT = "https://api.murf.ai/v1/speech/generate"

@app.post("/tts", response_model=TTSResponse, tags=["TTS"])
async def generate_tts(req: TTSRequest):
    if not MURF_API_KEY:
        raise HTTPException(status_code=500, detail="Missing MURF_API_KEY")

    payload = {
        "text": req.text,
        "voiceId": req.voice_id,
        "format": "MP3"
    }
    headers = {"api-key": MURF_API_KEY}

    async with httpx.AsyncClient() as client:
        response = await client.post(MURF_ENDPOINT, json=payload, headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    data = response.json()
    audio_url = data.get("audioFile")

    if not audio_url:
        raise HTTPException(status_code=500, detail="No audio file returned from Murf")

    return {"audio_url": audio_url}
