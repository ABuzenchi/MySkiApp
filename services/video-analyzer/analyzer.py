import cv2
import os

def analyze_latest_video(upload_dir="uploads"):
    # Găsește ultimul fișier video încărcat
    videos = [f for f in os.listdir(upload_dir) if f.endswith((".mp4", ".mov"))]
    if not videos:
        print("❌ Nu există fișiere video în folderul uploads/")
        return

    latest_video = max([os.path.join(upload_dir, f) for f in videos], key=os.path.getctime)
    print(f"📂 Analizăm videoclipul: {latest_video}")

    # Deschide videoclipul
    cap = cv2.VideoCapture(latest_video)

    if not cap.isOpened():
        print("❌ Eroare la deschiderea videoclipului")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps

    print(f"🎞️ FPS: {fps:.2f}, Cadre: {frame_count}, Durată: {duration:.2f} secunde")

    # Citește și afișează fiecare cadru (maxim 300 pentru test)
    frame_index = 0
    while cap.isOpened() and frame_index < 300:
        ret, frame = cap.read()
        if not ret:
            break

        cv2.imshow("Cadru video", frame)

        if cv2.waitKey(20) & 0xFF == ord('q'):
            break

        frame_index += 1

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    analyze_latest_video()
