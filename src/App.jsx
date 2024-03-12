import React from 'react';
import './App.css'; // Assume this file contains your CSS

const NumberLine = () => {
  // Example positions - you would generate these randomly within your component
  const answers = [4.25, 2.5, 1.33, -5.2]

  return (
        <div className="number-line">
      {/* Render the line */}
      <div className="line">
        {[...Array(21)].map((_, index) => (
          <div key={index} data-number={index-10} className="mark" style={{left: `${index * 5}%`}}>
          </div>
        ))}
      </div>
      {/* Render arrows and input fields based on positions */}
      {answers.map((position, index) => (
        <div key={index} data-number={position} className="arrow-and-input" style={{ right: `${position * 10}%` }}>
          <input type="text" />
          <div className="arrow" />
        </div>
      ))}
    </div>
  );
};

export default NumberLine;
