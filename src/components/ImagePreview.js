import React from "react";

function ImagePreview({ files }) {
  return files.length > 0 && (
    <div className="image-preview">
      {files.map((file, index) => (
        <div key={index} className="image-container">
          <img src={URL.createObjectURL(file)} alt={`Uploaded ${file.name}`} />
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ImagePreview;
