// SummaryTable.js
import React from "react";

function SummaryTable({ confidence }) {
  if (!confidence || confidence.length === 0) {
    return null;
  }

  const handleRowClick = (filename) => {
    const element = document.getElementById(`prediction-${filename}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('highlight-card');
      setTimeout(() => {
        element.classList.remove('highlight-card');
      }, 1500);
    }
  };

  return (
    <div className="summary-table-container">
      <h2>Summary Results</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Predicted Class</th>
            <th>Confidence Level</th>
          </tr>
        </thead>
        <tbody>
          {confidence.map((result, index) => {
            const predictedClass = result.predictedClass || 'N/A';
            const confidenceScore = result.confidenceScores && result.confidenceScores[predictedClass]
              ? `${(result.confidenceScores[predictedClass] * 100).toFixed(2)}%`
              : 'N/A';

            return (
              <tr 
                key={index}
                onClick={() => handleRowClick(result.filename)}
                className="clickable-row"
                title="Click to view details"
              >
                <td>{result.filename}</td>
                <td>{predictedClass}</td>
                <td>{confidenceScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;