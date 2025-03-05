import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');

  const handleNumber = (num) => {
    // Cegah angka awal dengan 0
    if (display === '0' && num === '0') return;
    
    // Reset display jika sebelumnya adalah hasil perhitungan
    if (display === 'Error' || display.includes('e')) {
      setDisplay(num);
      setFormula(num);
      return;
    }

    // Tambahkan angka
    setDisplay(
      display === '0' ? num : display + num
    );
    setFormula(formula + num);
  };

  const handleOperator = (op) => {
    // Hindari operator berulang
    const lastChar = formula.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(lastChar)) {
      // Ganti operator terakhir
      setFormula(formula.slice(0, -1) + op);
    } else {
      setFormula(formula + op);
    }
    
    // Reset display untuk input berikutnya
    setDisplay(op);
  };

  const calculate = () => {
    try {
      // Gunakan eval dengan hati-hati
      const result = eval(formula);
      const roundedResult = Number(result.toFixed(4));
      
      setDisplay(roundedResult.toString());
      setFormula(roundedResult.toString());
    } catch (error) {
      setDisplay('Error');
      setFormula('');
    }
  };

  const clearCalculator = () => {
    setDisplay('0');
    setFormula('');
  };

  const handleDecimal = () => {
    // Cegah titik ganda
    if (display.includes('.')) return;
    
    setDisplay(display + '.');
    setFormula(formula + '.');
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{display}</div>
      <div className="buttons">
        <button id="clear" onClick={clearCalculator}>AC</button>
        <button id="divide" onClick={() => handleOperator('/')}>÷</button>
        <button id="multiply" onClick={() => handleOperator('*')}>×</button>
        
        <button id="seven" onClick={() => handleNumber('7')}>7</button>
        <button id="eight" onClick={() => handleNumber('8')}>8</button>
        <button id="nine" onClick={() => handleNumber('9')}>9</button>
        <button id="subtract" onClick={() => handleOperator('-')}>-</button>
        
        <button id="four" onClick={() => handleNumber('4')}>4</button>
        <button id="five" onClick={() => handleNumber('5')}>5</button>
        <button id="six" onClick={() => handleNumber('6')}>6</button>
        <button id="add" onClick={() => handleOperator('+')}>+</button>
        
        <button id="one" onClick={() => handleNumber('1')}>1</button>
        <button id="two" onClick={() => handleNumber('2')}>2</button>
        <button id="three" onClick={() => handleNumber('3')}>3</button>
        <button id="equals" onClick={calculate}>=</button>
        
        <button id="zero" onClick={() => handleNumber('0')}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
}

export default App;