import React from "react";

function PredictionButton({ files, handlePredict, loading }) {
  return (
    <button onClick={handlePredict} className="predict-button">
      {loading ? "Predicting..." : "Predict"}
    </button>
  );
}

export default PredictionButton;
