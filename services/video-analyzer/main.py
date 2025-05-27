from fastapi.responses import FileResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os, shutil
from pose_detector import detect_pose_on_video

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = os.path.join(UPLOAD_FOLDER, "processed")
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.mount("/processed", StaticFiles(directory=PROCESSED_FOLDER), name="processed")

@app.post("/upload")
async def upload_video(video: UploadFile = File(...)):
    save_path = os.path.join(UPLOAD_FOLDER, video.filename)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    processed_filename = detect_pose_on_video(save_path)
    return {
        "message": "Video uploaded + analyzed",
        "filename": video.filename,
        "processed": processed_filename
    }

# ✅ Nou: endpoint pentru forțarea descărcării
@app.get("/download/{filename}")
async def download_video(filename: str):
    path = os.path.join(PROCESSED_FOLDER, filename)
    if os.path.exists(path):
        return FileResponse(
            path,
            media_type="application/octet-stream",
            filename=filename
        )
    return {"error": "Fișierul nu a fost găsit."}
