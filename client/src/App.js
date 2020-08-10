import React from 'react';
import Web3 from 'web3';
import { abi } from './abi';
import logo from './logo.svg';
import './App.css';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import { v4 as uuidv4 } from 'uuid';



const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x975fFf76c4fa14983C54b36B49117eEeAD219566';
const contractInstance = new web3.eth.Contract(abi, contractAddress);
console.log(contractInstance);

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
        <div className="name">
          Contract Address: <span id="contract_address"></span>
        </div>
        <div className="name">
          Connected With: <span id="connectedWal_address"></span>
        </div>
        <div className="name">
          Owner: <span id="owner_address"></span>
        </div>
      </header>
      <div className="App">
        <Header/>
        <CoinList coinData={this.state.coinData} />
      </div>
    </div>
  );
}

export default App;
