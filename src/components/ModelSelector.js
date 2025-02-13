import React from "react";

function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <div className="model-selector">
      <label htmlFor="model-select">Select Model:</label>
      <select id="model-select" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="model_2v">Model 2v (Baseline)</option>
        <option value="kvasir_xception_model_working_grad">Kvasir Xception Model (Grad-CAM)</option>
      </select>
    </div>
  );
}

export default ModelSelector;
