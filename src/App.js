import React, { useState } from "react";

function EndoscopyUploader() {
  const [image, setImage] = useState(null); // To store the uploaded image
  const [confidence, setConfidence] = useState(null); // To store prediction results
  const [file, setFile] = useState(null); // To store the uploaded file
  const [loading, setLoading] = useState(false); // For showing loading state

  // Handle image upload
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  // Handle prediction request
  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
        headers: {
          // No need to manually set "Content-Type" for FormData; the browser handles it.
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setConfidence(data);
    } catch (error) {
      console.error("Error during API call:", error);
      alert("Failed to get predictions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#121212",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1>Endoscopy Image Classifier</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#65CCB8",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      />
      {image && (
        <div>
          <h2>Uploaded Image:</h2>
          <img
            src={image}
            alt="Uploaded"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          />
        </div>
      )}
      {image && (
        <button
          onClick={handlePredict}
          style={{
            padding: "10px 20px",
            backgroundColor: "#65CCB8",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      )}
      {confidence && (
        <div style={{ marginTop: "20px" }}>
          <h2>Prediction Results:</h2>
          <p>
            <strong>Predicted Class:</strong> {confidence.predictedClass}
          </p>
          <h3>Confidence Levels:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.entries(confidence.confidenceScores).map(
              ([className, score]) => (
                <li key={className}>
                  {className}: {(score * 100).toFixed(2)}%
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EndoscopyUploader;
