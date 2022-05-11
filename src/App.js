import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const [input4, setinput4] = useState("");
  const [computerGuess, setComputerGuess] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {

    axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then((response) => {
      setComputerGuess(response.data.split("").filter(element => element !== '\n'));
    });

  }, [])


  const onCheckHandler = () => {

    const inputVals = [input1,input2,input3,input4];
    const historyObj = {input1,input2,input3,input4,correctCounter:0,placedCounter:0}
    const computerGuessCopy = [...computerGuess]
    inputVals.forEach((element,index) => {
      if(computerGuessCopy.includes(element)){
        historyObj.correctCounter++
        const i = computerGuessCopy.indexOf(element);
        i > -1 && computerGuessCopy.splice(i,1); 
      }
      if(computerGuess[index] === element){
        historyObj.placedCounter++
      }
    });
    setinput1("");
    setinput2("");
    setinput3("");
    setinput4("");
    setHistory([...history,{...historyObj}])
  }

  return (
    <div>
      {/* <p>{computerGuess}</p>  */}
      <h5>You Have {10 - history.length} tries left</h5>
      <table>
        <thead>
        <tr>
          <th>Input1</th>
          <th>Input2</th>
          <th>Input3</th>
          <th>Input4</th>
          <th>Check</th>
          <th>Correct</th>
          <th>Correctly placed</th>
        </tr>
        </thead>
        <tbody>
        {history.map((element,index) => 
          <tr key={index}>
            <td>{element.input1}</td>
            <td>{element.input2}</td>
            <td>{element.input3}</td>
            <td>{element.input4}</td>
            <td>  </td>
            <td>{element.correctCounter}</td>
            <td>{element.placedCounter}</td>
          </tr>
        )}
        { 
          history.length < 10 && !(history[history.length -1]?.placedCounter >= 4) &&
          <tr>
            <td> <input type="number" value={input1} onChange={(e) => (/^[0-7]$/.test(e.target.value) || e.target.value === "") && setinput1(e.target.value)} /> </td>
            <td> <input type="number" value={input2} onChange={(e) => (/^[0-7]$/.test(e.target.value) || e.target.value === "") && setinput2(e.target.value)}/> </td>
            <td> <input type="number" value={input3} onChange={(e) => (/^[0-7]$/.test(e.target.value) || e.target.value === "") && setinput3(e.target.value)}/> </td>
            <td> <input type="number" value={input4} onChange={(e) => (/^[0-7]$/.test(e.target.value) || e.target.value === "") && setinput4(e.target.value)}/> </td>
            <td> <button onClick={onCheckHandler} disabled={!input1 || !input2 || !input3 || !input4 } >Check</button> </td>
            <td>-</td>
            <td>-</td>
          </tr>
        }  
        </tbody>
      </table>
      {history[history.length -1]?.placedCounter >= 4 && <h5>You have won the game</h5>}
      {history.length >= 10 && !(history[history.length -1]?.placedCounter >= 4) && <h5>You have lost the game the correct answer is {computerGuess}</h5>}
    </div>
  )
}

export default App