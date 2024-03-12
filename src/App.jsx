import React from 'react';
import './App.css'; // Assume this file contains your CSS

const NumberLine = () => {
  // Example positions - you would generate these randomly within your component
  const answers = [-7, -3, 0, 2, 5, 7, 9]

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
        // Convert the position from -10 to 10 range into a 0 to 100% range for the CSS left property
        // Assuming -10 is at 0% and 10 is at 100%, calculate the left percentage
        // Formula: ((position - minimum) / totalRange) * 100
        <div key={index} data-number={position} className="arrow-and-input" style={{ left: `${((position + 10) / 20) * 100}%` }}>
            <input type="text" />
            <div className="arrow" />
        </div>
        ))}
    </div>
  );
};

export default NumberLine;
