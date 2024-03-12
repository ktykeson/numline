import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from './Popup.jsx';

const NumberLine = () => {
    const [answers, setAnswers] = useState([]);
    const [userInputs, setUserInputs] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
  
    // Adjusted number generation function remains the same
  
    // Function to handle user input change
    const handleInputChange = (index, value) => {
      setUserInputs({
        ...userInputs,
        [index]: value.trim() // Trim whitespace
      });
    };
  
    // Function to check answers
    const checkAnswers = () => {
      const allCorrect = answers.every((answer, index) => parseFloat(userInputs[index]) === answer);
  
      if(allCorrect) {
        setPopupMessage('Correct! Great job!');
      } else {
        setPopupMessage('Incorrect. Try again!');
      }
  
      setShowPopup(true); // Show the popup with the result
    };
  
    // Popup confirmation function
    const closePopup = () => {
        window.location.reload(); // Reload the page
    };

  // Function to generate a random number of floats within the range -10 to 10
  const generateRandomNumbers = () => {
    const amount = Math.floor(Math.random() * (7 - 4 + 1)) + 4; // Total numbers to generate
    const wholeNumbersCount = Math.floor(amount / 2); // Half of them should be whole numbers
    let numbers = []; // Initialize the array to store generated numbers
  
    while (numbers.length < amount) {
      const isWholeNumber = numbers.length < wholeNumbersCount;
      let num;
  
      if (isWholeNumber) {
        num = Math.floor(Math.random() * 21) - 10; // Generate whole numbers between -10 and 10
      } else {
        num = parseFloat((Math.random() * 20 - 10).toFixed(2)); // Generate floating points between -10 and 10
      }
  
      // Check if the generated number is sufficiently far from existing numbers
      const isFarEnough = numbers.every(existingNum => Math.abs(existingNum - num) > 1);
  
      if (isFarEnough) {
        numbers.push(num);
      }
    }
  
    setAnswers(numbers);
  };

  // Generate numbers on component mount
  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <div className="number-line">
      <div className="line">
        {[...Array(21)].map((_, index) => (
          <div key={index} data-number={index - 10} className="mark" style={{ left: `${index * 5}%` }}>
          </div>
        ))}
      </div>
      <p className="instructions">Match the following numbers to the correct position on the number line:</p>
      <div className="numbers-list">
        {answers.map((number, index) => (
          <span key={index} className="number">{number}</span>
        ))}
      </div>
      {answers.map((position, index) => (
        <div key={index} data-number={position} className="arrow-and-input" style={{ left: `${(4*position+50)}%` }}>
          <input type="text" onChange={(e) => handleInputChange(index, e.target.value)} />
          <div className="arrow" />
        </div>
      ))}
      <button className="check-button" onClick={checkAnswers}>Check</button>
      {showPopup && <Popup message={popupMessage} confirm={closePopup} />}
    </div>
  );
};

export default NumberLine;