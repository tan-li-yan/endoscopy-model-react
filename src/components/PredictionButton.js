import React from "react";

function PredictionButton({ handlePredict, loading }) {
  return (
    <div className="prediction-button-container">
      <button onClick={handlePredict} className="predict-button">
        {loading ? "Predicting..." : "Predict"}
      </button>
    </div>
  );
}

export default PredictionButton;
