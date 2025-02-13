function UploadModeSelector ({mode, setMode, setFiles}){
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setFiles([]); //clears the uploaded files whenever there is a mode switch.
  };
  
  return(<div className = "upload-mode-selector">
    <button onClick = {()=> handleModeChange("single")}>Single Upload</button>
    <button onClick={() => handleModeChange("batch")}>Batch Processing</button>

  </div>);

}
export default UploadModeSelector