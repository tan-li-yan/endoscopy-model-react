import React from "react"

function FileUploader({mode, setFiles}){
  const handleFileUpload = (event)  => {
    const selectedFiles = Array.from(event.target.files);
    if (mode === "single" && selectedFiles.length > 1) {
      alert("Please upload only one image in Single Upload mode.");
      return;
    }

    if (mode === "batch" && selectedFiles.length > 20) {
      alert("Please upload a maximum of 20 images in Batch Processing mode.");
      return;
    
    }
    setFiles(selectedFiles);
  };
  return (
    <input type="file" accept="image/*"multiple={mode === "batch"} onChange={handleFileUpload} />
  );

}
export default FileUploader;