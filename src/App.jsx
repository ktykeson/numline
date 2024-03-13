import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from './Popup.jsx';

const NumberLine = () => {
    const [answers, setAnswers] = useState([]);
    const [userInputs, setUserInputs] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
  
    // Function to handle number drag start
    const handleDragStart = (e, number) => {
        e.dataTransfer.setData('text/plain', number);
      };
  
      // Function to handle drop on input field
      const handleDrop = (index, e) => {
        e.preventDefault();
        const number = e.dataTransfer.getData('text');
        setUserInputs({
          ...userInputs,
          [index]: number.trim() // Trim whitespace and set as input value
        });
  
        // Optional: You might want to update the input fields to show the dropped number
        e.target.value = number.trim(); // This directly sets the input value which is not the React way
      };
  
      // Function to allow dropping by preventing the default behavior
      const allowDrop = (e) => {
        e.preventDefault();
      };
  
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
        setUserInputs({})
        setPopupMessage('Correct! Goed gedaan!');
      } else {
        setPopupMessage('Onjuist. Probeer het opnieuw!');
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
      <p className="instructions">Zet de volgende getallen op de juiste plaats op de getallenlijn:</p>
      <div className="numbers-list">
        {answers.map((number, index) => (
          // Making numbers draggable
          //if number is in userInputs, put a activeNumber class to the span
          // userInputs looks like this { [index]: data }
          <span key={index} className={`number ${Object.keys(userInputs).some(key => userInputs[key] == number) ? 'activeNumber' : ''}`} draggable="true" 
                onDragStart={(e) => e.dataTransfer.setData('text', number.toString())}
                >
            {number}
          </span>
        ))}
      </div>
      {answers.map((position, index) => (
        <div key={index} data-number={position} className="arrow-and-input" style={{ left: `${(4*position+50)}%` }}>
          <input type="text" 
                className={`input_field ${userInputs[index] ? "haveNumber" : ''}`}
                data-test={userInputs[index]}
                value={userInputs[index]}
                placeholder='. . . .'
                 onDrop={(e) => {
                   e.preventDefault();
                   const data = e.dataTransfer.getData('text');
                   setUserInputs({...userInputs, [index]: data});
                //    e.target.value = data; // Direct manipulation for visual feedback, consider syncing with state for React-controlled approach
                 }} 
                 onDragOver={(e) => e.preventDefault()} // Necessary to allow drop
                 onChange={(e) => handleInputChange(index, e.target.value)} />
          <div className="arrow" />
        </div>
      ))}
      <button className="check-button" onClick={checkAnswers}>Controleer</button>
      {showPopup && <Popup message={popupMessage} confirm={closePopup} />}
    </div>
  );
};

export default NumberLine;