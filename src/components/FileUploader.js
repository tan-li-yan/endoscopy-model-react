import React from "react"

function FileUploader(mode, setFiles){
  const handleFileUpload = (event)  => {
    const selectedFiles = Array.from(event.target.files);
  }
  return (
    <input type="file" accept="image/*" />
  );

}
export default FileUploader;