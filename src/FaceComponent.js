import React, { useState, useRef } from "react";

const FaceComponent = () => {
    const videoRef = useRef(null);
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [isCapturing, setIsCapturing] = useState(false);

    // Start Camera
    const startCamera = async () => {
        if (!userName.trim()) {
            setMessage("❌ Please enter your name.");
            return;
        }

        if (isCapturing) return;

        setIsCapturing(true);
        setMessage("📸 Starting camera...");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error accessing webcam:", error);
            setMessage("❌ Webcam access denied.");
            setIsCapturing(false);
        }
    };

    // Stop Camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCapturing(false);
    };

    // Capture and send 10 images
    const captureImages = async () => {
        if (!videoRef.current) return;

        for (let i = 1; i <= 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));  // 1-second delay

            const canvas = document.createElement("canvas");
            const video = videoRef.current;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            await sendImage(canvas, i);
        }
        stopCamera();
        setMessage("✅ Captured and sent 10 images.");
    };

    // Send image to backend
    const sendImage = async (canvas, count) => {
        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                const imageName = `${userName}_${count}.jpg`;
                formData.append("image", blob, imageName);
                formData.append("name", userName);

                try {
                    const response = await fetch("https://mypythonproject.onrender.com/capture_faces", {
                        method: "POST",
                        body: formData,
                        mode: "cors"  // ✅ Ensure CORS handling
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setMessage(`📤 Image ${count}/10 sent: ${data.message || "Success"}`);
                    } else {
                        setMessage(`❌ Error uploading image ${count}.`);
                    }
                } catch (error) {
                    console.error("Upload error:", error);
                    setMessage(`❌ Error uploading image ${count}.`);
                }

                resolve();
            }, "image/jpeg");
        });
    };

    // Train Model API (Fixed)
   const trainModel = async () => {
    if (!userName.trim()) {
        setMessage("❌ Please enter your name.");
        return;
    }

    setMessage("⏳ Training model...");

    try {
        const response = await fetch("https://mypythonproject.onrender.com/train_model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_name: userName })   // ✅ Correct payload
        });

        const data = await response.json();
        
        if (response.ok) {
            setMessage(`✅ Training Result: ${data.message || "Success"}`);
        } else {
            setMessage("❌ Error training model.");
        }
    } catch (error) {
        console.error("Error training model:", error);
        setMessage("❌ Error training model.");
    }
};

    // Recognize Face API
    const recognizeFace = async () => {
        if (!userName.trim()) {
            setMessage("❌ Please enter your name.");
            return;
        }

        setMessage("📸 Capturing image for recognition...");
        setIsCapturing(true);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = videoRef.current;
            video.srcObject = stream;

            await new Promise((resolve) => setTimeout(resolve, 2000));  // Camera stabilization delay

            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("image", blob, "recognition.jpg");
                formData.append("username", userName);  // ✅ Send username properly

                try {
                    const response = await fetch("https://mypythonproject.onrender.com/recognize", {
                        method: "POST",
                        body: formData,
                        mode: "cors"  // ✅ Ensure CORS handling
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setMessage(
                            data.recognized_faces
                                ? `✅ Recognized: ${JSON.stringify(data.recognized_faces)}`
                                : "❌ No face recognized."
                        );
                    } else {
                        setMessage("❌ No face recognized.");
                    }
                } catch (error) {
                    console.error("Recognition error:", error);
                    setMessage("❌ Error recognizing face.");
                } finally {
                    stopCamera();
                }
            }, "image/jpeg");

        } catch (error) {
            console.error("Camera error:", error);
            setMessage("❌ Unable to access camera.");
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <video ref={videoRef} autoPlay className="w-96 border-2 border-gray-500"></video>

            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-4 p-2 border rounded w-80"
            />

            <button
                onClick={() => {
                    startCamera().then(captureImages);
                }}
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded"
                disabled={isCapturing}
            >
                {isCapturing ? "Capturing..." : "Start & Capture"}
            </button>

            <button onClick={trainModel} className="mt-2 px-4 py-2 text-white bg-green-500 rounded">
                Train Model
            </button>

            <button onClick={recognizeFace} className="mt-2 px-4 py-2 text-white bg-purple-500 rounded">
                Recognize Face
            </button>

            <button onClick={stopCamera} className="mt-2 px-4 py-2 text-white bg-red-500 rounded">
                Stop Camera
            </button>

            {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
        </div>
    );
};

export default FaceComponent;
