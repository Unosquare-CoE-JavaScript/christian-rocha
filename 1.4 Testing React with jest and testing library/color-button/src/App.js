import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [isEnabled, setIsEnabled] = useState(true);

  const newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
  const newIsEnabled = isEnabled === true ? false : true;

  return (
    <div>
      <button 
        style={isEnabled ? {backgroundColor:buttonColor}: {backgroundColor:'gray'}} 
        onClick={() => setButtonColor(newButtonColor)}
        disabled={!isEnabled}
        >
          Change to {newButtonColor}
      </button>
      <input type='checkbox' onChange={() => setIsEnabled(newIsEnabled)} />
    </div>
  );
}

export default App;
