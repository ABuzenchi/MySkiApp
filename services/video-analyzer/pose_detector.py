import cv2
import mediapipe as mp
import matplotlib.pyplot as plt
import numpy as np
import os
import subprocess

def draw_speedometer(frame, speed_kmh):
    h, w, _ = frame.shape
    center = (w - 150, h - 150)  # colțul dreapta-jos
    radius = 120  # mai mare decât 100
    angle = int(min(speed_kmh / 140 * 270, 270))  # scalare până la 140 km/h

    # fundal gri
    cv2.ellipse(frame, center, (radius, radius), 0, 135, 405, (60, 60, 60), 12)

    # arc turcoaz în funcție de viteză
    cv2.ellipse(frame, center, (radius, radius), 0, 135, 135 + angle, (0, 255, 255), 12)

    # text central cu viteza
    cv2.putText(frame, f"{int(speed_kmh)} km/h", (center[0] - 65, center[1] + 15),
                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 3)

    return frame



def detect_pose_on_video(video_path):
    
    PIXELS_PER_METER = 100
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5)
    mp_drawing = mp.solutions.drawing_utils

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("❌ Nu s-a putut deschide videoclipul.")
        return None

    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    filename = os.path.basename(video_path)
    output_path = os.path.join("uploads", "processed", f"processed_{filename}")

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (w, h))

    positions = []
    speeds = []
    times = []
    frame_index = 0

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        speed_kmh = 0

        if results.pose_landmarks:
            nose = results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE]
            cx, cy = int(nose.x * w), int(nose.y * h)
            time_sec = frame_index / fps
            positions.append((time_sec, cx, cy))

            if len(positions) >= 2:
                t1, x1, y1 = positions[-2]
                t2, x2, y2 = positions[-1]
                dist_px = np.linalg.norm([x2 - x1, y2 - y1])
                delta_t = t2 - t1
                speed_mps = (dist_px / PIXELS_PER_METER) / delta_t if delta_t > 0 else 0
                speed_kmh = speed_mps * 3.6
                speeds.append(speed_kmh)
                times.append(t2)

            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        frame = draw_speedometer(frame, speed_kmh)


        out.write(frame)
        frame_index += 1

    cap.release()
    out.release()

    # 🔁 Conversie pentru compatibilitate maximă
    converted_path = output_path.replace(".mp4", "_converted.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-i", output_path,
        "-vcodec", "libx264", "-acodec", "aac",
        converted_path
    ])

    # ✅ Returnează numele fișierului convertit
    return os.path.basename(converted_path)
