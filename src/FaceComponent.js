import React, { useState, useRef } from "react";

const FaceComponent = () => {
    const videoRef = useRef(null);
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [isCapturing, setIsCapturing] = useState(false);

    const startCamera = async () => {
        if (isCapturing) return;
        setIsCapturing(true);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing webcam:", error);
            setMessage("❌ Webcam access denied.");
            setIsCapturing(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCapturing(false);
    };

    const captureImage = async () => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("image", blob, `${userName}.jpg`);
            formData.append("username", userName);

            try {
                const response = await fetch("https://mypythonproject.onrender.com/capture_faces", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    setMessage("✅ Image captured successfully!");
                } else {
                    setMessage("❌ Error capturing image.");
                }
            } catch (error) {
                console.error("Upload error:", error);
                setMessage("❌ Error capturing image.");
            }
        }, "image/jpeg");
    };

    const trainModel = async () => {
        try {
            setMessage("⏳ Training model...");
            const response = await fetch("https://mypythonproject.onrender.com/train_model", { method: "POST" });

            if (response.ok) {
                setMessage("✅ Training completed!");
            } else {
                setMessage("❌ Error training model.");
            }
        } catch (error) {
            console.error("Training error:", error);
            setMessage("❌ Error training model.");
        }
    };

    const recognizeFace = async () => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("image", blob, "recognition.jpg");

            try {
                setMessage("⏳ Recognizing face...");
                const response = await fetch("https://mypythonproject.onrender.com/recognize", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage(`✅ Recognized as: ${data.name}`);
                } else {
                    setMessage("❌ Face not recognized.");
                }
            } catch (error) {
                console.error("Recognition error:", error);
                setMessage("❌ Error recognizing face.");
            }
        }, "image/jpeg");
    };

    return (
        <div className="face-container">
            <video ref={videoRef} autoPlay className="video-stream"></video>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={startCamera} disabled={isCapturing}>Start Camera</button>
            <button onClick={captureImage} disabled={!userName || !isCapturing}>Capture Image</button>
            <button onClick={trainModel}>Train Model</button>
            <button onClick={recognizeFace}>Recognize Face</button>
            <button onClick={stopCamera}>Stop Camera</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FaceComponent;
