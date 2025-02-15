import React from "react";
import "../styles/global.css";

function UploadModeSelector ({mode, setMode, setFiles}){
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setFiles([]); //clears the uploaded files whenever there is a mode switch.
  };
  
  return(<div className = "upload-mode-selector">
    <button onClick={() => handleModeChange("single")}
        className={`mode-button ${mode === "single" ? "active" : ""}`}
      >Single Upload</button>
    <button 
        onClick={() => handleModeChange("batch")}
        className={`mode-button ${mode === "batch" ? "active" : ""}`}
      >Batch Processing</button>

  </div>);

}
export default UploadModeSelector