import React from "react";

function PredictionResults({ confidence, files }) {
  if (!confidence || confidence.length === 0) {
    return <p>No predictions available.</p>;
  }

  return (
    <div className="prediction-results">
      <h2 className="title">Prediction Results</h2>
      {confidence.map((result, index) => (
        <div key={index} className="prediction-row">
          {/*Uploaded Image */}
          <div className="uploaded-image">
            {files[index] && (
              <img
                src={URL.createObjectURL(files[index])}
                alt={`Original ${result.filename}`}
                className="original-image"
              />
            )}
          </div>

          {/*Grad-CAM (if available) */}
          {result.gradcam && (
            <div className="gradcam-image">
              <img
                src={`http://127.0.0.1:8000${result.gradcam}`}
                alt="Grad-CAM Heatmap"
                className="gradcam-heatmap"
              />
            </div>
          )}

          {/*Prediction Details */}
          <div className="prediction-details">
            <h3 className="filename">File: {result.filename}</h3>
            <p className="predicted-class">
              Predicted Class: <span className="highlight">{result.predictedClass}</span> (
              {(result.confidenceScores[result.predictedClass] * 100).toFixed(2)}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PredictionResults;


