// import React, { useState } from "react";

// function EndoscopyUploader() {
//   const [mode, setMode] = useState("single"); // Track upload mode (single or batch)
//   const [files, setFiles] = useState([]); // Store uploaded files
//   const [confidence, setConfidence] = useState(null); // Store prediction results
//   const [loading, setLoading] = useState(false); // Show loading state
//   const [selectedModel, setSelectedModel] = useState("model_2v"); // Default model selection
//   const [resultRefs] = useState(() => Array(20).fill(0).map(() => React.createRef())); // Create refs for scrolling

//   // Handle mode change
//   const handleModeChange = (selectedMode) => {
//     setMode(selectedMode);
//     setFiles([]);
//     setConfidence(null);
//   };

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const selectedFiles = Array.from(event.target.files);

//     if (mode === "single" && selectedFiles.length > 1) {
//       alert("Please upload only one image in Single Upload mode.");
//       return;
//     }

//     if (mode === "batch" && selectedFiles.length > 20) {
//       alert("Please upload a maximum of 20 images in Batch Processing mode.");
//       return;
//     }

//     setFiles(selectedFiles);
//   };

//   // Scroll to result function
//   const scrollToResult = (index) => {
//     resultRefs[index]?.current?.scrollIntoView({ 
//       behavior: 'smooth',
//       block: 'start'
//     });
//   };

//   // Handle prediction request
//   const handlePredict = async () => {
//     if (!files.length) {
//       alert("Please upload at least one image.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append("images", file);
//     });
//     formData.append("mode", mode);
//     formData.append("model", selectedModel); // Include selected model in the request

//     try {
//       const response = await fetch("http://127.0.0.1:8000/predict", {
//           method: "POST",
//           body: formData,
//       });
  
//       if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
//       }
  
//       const data = await response.json();
//       setConfidence(data);
//     } catch (error) {
//       console.error("Detailed error:", error);
//       alert(`Failed to get predictions: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "20px",
//         backgroundColor: "#F5F5F5",
//         color: "black",
//         minHeight: "100vh",
//       }}
//     >
//       <h1 style={{ color: "#4B9B6E" }}>Endoscopy Image Classifier</h1>

//       {/* Dropdown menu to select the model */}
//       <div style={{ marginBottom: "20px" }}>
//         <label htmlFor="model-select" style={{ fontSize: "18px", fontWeight: "bold" }}>
//           Select Model:
//         </label>
//         <select
//           id="model-select"
//           value={selectedModel}
//           onChange={(e) => setSelectedModel(e.target.value)}
//           style={{
//             marginLeft: "10px",
//             padding: "10px",
//             border: "2px solid #4B9B6E",
//             borderRadius: "5px",
//             fontSize: "16px",
//           }}
//         >
//           <option value="model_2v">Model 2v (Baseline)</option>
//           <option value="kvasir_xception_model_working_grad">Kvasir Xception Model (Grad-CAM)</option>
//         </select>
//       </div>

//       {/* Buttons to select Single Upload or Batch Processing */}
//       <div style={{ marginBottom: "20px" }}>
//         <button
//           onClick={() => handleModeChange("single")}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             backgroundColor: mode === "single" ? "#FFCE1B" : "#2E7D5C",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Single Upload
//         </button>
//         <button
//           onClick={() => handleModeChange("batch")}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: mode === "batch" ? "#FFCE1B" : "#2E7D5C",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Batch Processing
//         </button>
//       </div>

//       {/* File input for uploading images */}
//       <input
//         type="file"
//         accept="image/*"
//         multiple={mode === "batch"}
//         onChange={handleFileUpload}
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           backgroundColor: "white",
//           color: "#4B9B6E",
//           border: "2px solid #4B9B6E",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       />

//       {/* Display uploaded images before prediction */}
//       {files.length > 0 && (
//         <div>
//           <h2 style={{ color: "#4B9B6E" }}>
//             Uploaded {mode === "single" ? "Image" : "Images"}:
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "center",
//               gap: "20px",
//             }}
//           >
//             {files.map((file, index) => (
//               <div
//                 key={index}
//                 style={{
//                   position: "relative",
//                   width: "200px",
//                   height: "200px",
//                 }}
//               >
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`Uploaded ${file.name}`}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: "0",
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     color: "white",
//                     width: "100%",
//                     textAlign: "center",
//                     padding: "5px",
//                     borderRadius: "0 0 5px 5px",
//                   }}
//                 >
//                   {file.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Prediction button */}
//       {files.length > 0 && (
//         <button
//           onClick={handlePredict}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#65CCB8",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//             marginTop: "10px",
//           }}
//         >
//           {loading ? "Predicting..." : "Predict"}
//         </button>
//       )}

//       {/* Summary Table for Batch Predictions */}
//       {confidence && mode === "batch" && (
//         <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//           <h2 style={{ color: "#4B9B6E" }}>Summary Results</h2>
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ 
//               width: "100%", 
//               borderCollapse: "collapse", 
//               backgroundColor: "white",
//               border: "2px solid #4B9B6E",
//               borderRadius: "5px",
//             }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#4B9B6E", color: "white" }}>
//                   <th style={{ padding: "12px", textAlign: "left" }}>File Name</th>
//                   <th style={{ padding: "12px", textAlign: "left" }}>Predicted Class</th>
//                   <th style={{ padding: "12px", textAlign: "left" }}>Confidence Level</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {confidence.map((result, index) => (
//                   <tr 
//                     key={index}
//                     onClick={() => scrollToResult(index)}
//                     style={{
//                       cursor: "pointer",
//                       backgroundColor: "white",
//                       borderBottom: "1px solid #ddd",
//                       ':hover': {
//                         backgroundColor: "#f5f5f5"
//                       }
//                     }}
//                   >
//                     <td style={{ padding: "12px" }}>{result.filename}</td>
//                     <td style={{ padding: "12px" }}>{result.predictedClass}</td>
//                     <td style={{ padding: "12px" }}>
//                       {(result.confidenceScores[result.predictedClass] * 100).toFixed(2)}%
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Display prediction results */}
//       {confidence && (
//         <div style={{ marginTop: "20px" }}>
//           <h2 style={{ color: "#4B9B6E" }}>Prediction Results:</h2>
//           {confidence.map((result, index) => (
//             <div
//               key={index}
//               ref={resultRefs[index]}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: "20px",
//                 padding: "20px",
//                 backgroundColor: "white",
//                 border: "4px solid #4B9B6E",
//                 borderRadius: "10px",
//               }}
//             >
//               <div style={{ width: "40%" }}>
//                 {files[index] && (
//                   <img
//                     src={URL.createObjectURL(files[index])}
//                     alt={`Original ${result.filename}`}
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       objectFit: "contain",
//                       borderRadius: "5px",
//                     }}
//                   />
//                 )}
//               </div>
//               {result.gradcam && (
//                 <div style={{ width: "40%" }}>
//                   <img
//                     src={`http://127.0.0.1:8000${result.gradcam}`}
//                     alt="Grad-CAM Heatmap"
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       objectFit: "contain",
//                       borderRadius: "5px",
//                     }}
//                   />
//                 </div>
//               )}
//               <div style={{ width: "20%", textAlign: "left" }}>
//                 <h3 style={{ color: "#65CCB8" }}>File: {result.filename}</h3>
//                 <p style={{ fontSize: "18px", fontWeight: "bold" }}>
//                   Predicted Class:{" "}
//                   <span style={{ color: "#FF4C4C" }}>
//                     {result.predictedClass} (
//                     {(result.confidenceScores[result.predictedClass] * 100).toFixed(2)}%)
//                   </span>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default EndoscopyUploader;

import React, {useState} from "react";
import ModelSelector from "./components/ModelSelector";
import UploadModeSelector from "./components/UploadModeSelector";
import FileUploader from "./components/FileUploader";
import ImagePreview from "./components/ImagePreview";

function EndoscopyUploader(){
  const [mode, setMode] = useState("single");
  const [files, setFiles] = useState([]);
  const [selectedModel, setSelectedModel] = useState("model_2v");
  const handlePredict = async () => {

  }
  return (
    <div className="app-container">
      <h1 className = "title"> Endoscopy Image Classifier </h1>
      <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <UploadModeSelector mode={mode} setMode={setMode} setFiles={setFiles} />
      <FileUploader mode={mode} setFiles={setFiles} />
      <ImagePreview files={files} />
    </div>

    
  );
}

export default EndoscopyUploader;
