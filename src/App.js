import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { abi } from './abi'


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xEB7e15B4E38CbEE57a98204D05999C3230d36348'
export const contractInstance = new web3.eth.Contract(abi, contractAddress)
console.log(contractInstance);

// contractInstance.getPastEvents('Deposited', {fromBlock: 0, toBlock: 'latest'}, function(error, events){ console.log(events); })
// .on('data', function(event){
//   console.log(event); // same results as the optional callback above
// })

contractInstance.events.Deposited({
  fromBlock: 106
})
.on('data', function(event){
  console.log("DEPOSIT EVENT", "Depositor: ", event.returnValues[0], "Token:", event.returnValues[1], "Amount: ", event.returnValues[2], "Mint Amount",  event.returnValues[3]); // log event in terminal
})


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
