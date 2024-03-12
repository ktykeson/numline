import React from 'react';
import './App.css'; // Assume this file contains your CSS

const NumberLine = () => {
  // Example positions - you would generate these randomly within your component
  const positions = [-10, -5, 0, 5, 10];

  return (
    <div className="number-line">
      {/* Render the line */}
      <div className="line">
        {[...Array(21)].map((_, index) => (
          <div key={index} className="mark">{index - 10}</div>
        ))}
      </div>
      {/* Render arrows and input fields based on positions */}
      {positions.map((position, index) => (
        <div key={index} className="arrow-and-input" style={{ left: `${position * 10}%` }}>
          <input type="text" />
          <div className="arrow" />
        </div>
      ))}
    </div>
  );
};

export default NumberLine;
