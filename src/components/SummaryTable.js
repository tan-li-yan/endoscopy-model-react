import React from "react";

function SummaryTable({ confidence }) {
  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Predicted Class</th>
          <th>Confidence Level</th>
        </tr>
      </thead>
      <tbody>
        {confidence.map((result, index) => (
          <tr key={index}>
            <td>{result.filename}</td>
            <td>{result.predictedClass}</td>
            <td>{(result.confidenceScores[result.predictedClass] * 100).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SummaryTable;
