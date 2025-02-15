import React from "react";

function ImagePreview({ files }) {
  return files.length > 0 && (
    <div className="image-preview-container">
      <h2 className="image-preview-title">
        Uploaded {files.length === 1 ? "Image" : "Images"}:
      </h2>
      <div className="image-preview">
        {files.map((file, index) => (
          <div key={index} className="image-container">
            <img src={URL.createObjectURL(file)} alt={`Uploaded ${file.name}`} className="uploaded-image" />
            <div className="image-name">{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePreview;
