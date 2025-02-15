import React from "react";

function PredictionResults({ confidence, files }) {
  if (!confidence || confidence.length === 0) {
    return <p>No predictions available.</p>;
  }

  return (
    <div className="prediction-results-container">
      <h2 className="prediction-title">Prediction Results:</h2>
      {confidence.map((result, index) => {
        const predictedClass = result.predictedClass;
        const confidenceScore = result.confidenceScores?.[predictedClass]
          ? `${(result.confidenceScores[predictedClass] * 100).toFixed(2)}%`
          : "N/A";

        return (
          <div 
            key={index} 
            id={`prediction-${result.filename}`}
            className="prediction-card"
          >
            {/* Left: Original Image */}
            <div className="image-wrapper">
              {files && files[index] && (
                <img
                  src={URL.createObjectURL(files[index])}
                  alt={`Original ${result.filename}`}
                  className="original-image"
                />
              )}
            </div>

            {/* Middle: Grad-CAM Image */}
            <div className="image-wrapper">
              {result.gradcam && (
                <img
                  src={`http://localhost:8000${result.gradcam}`}
                  alt="Grad-CAM Heatmap"
                  className="gradcam-image"
                  onError={(e) => console.error("Failed to load Grad-CAM:", e)}
                />
              )}
            </div>

            {/* Right: Prediction Details */}
            <div className="prediction-info">
              <h3 className="filename">File: {result.filename}</h3>
              <p className="predicted-class">
                Predicted Class: {' '}
                <span className="highlight">
                  {predictedClass || 'N/A'}
                </span>
                {confidenceScore !== "N/A" && ` (${confidenceScore})`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PredictionResults;