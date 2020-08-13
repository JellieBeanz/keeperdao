import React, { useState } from 'react'
import Web3 from 'web3'
import AppData from './components/AppData/AppData'
import Table from './components/Table/Table'
import ContractBalance from './components/ContractBalance/ContractBalance'
import { abi } from './abi'
import './App.css'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0x6Ae9ABb1bF694E553137b206bed0496f6f9D4FcE'
export const contractInstance = new web3.eth.Contract(abi, contractAddress)
console.log(contractInstance);


function App() {
  const [borrowproxy, setborrowproxy] = useState("");
  const [getborrowproxy, setGetborrowproxy] = useState();
  const [_amountBorrowed, setamountborrowed] = useState();
  const [_amountToReturn, setamountToReturn] = useState();
  const [deposit, setdeposit] = useState(0)

 

  const handleSetProxy = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await contractInstance.methods.setBorrowProxy(borrowproxy).estimateGas();
    const result = await contractInstance.methods.setBorrowProxy(borrowproxy).send({ from: account, gas });
    console.log(result);
  }

  const handleGetProxy = async (e) => {
    e.preventDefault();
    const result = await contractInstance.methods.borrowProxy().call();
    setGetborrowproxy(result);
    console.log(result);
  }

  const handleborrow = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await contractInstance.methods.hello(_amountBorrowed,_amountToReturn).estimateGas();
    const result = await contractInstance.methods.hello(_amountBorrowed,_amountToReturn).send({ from: account, gas });
    console.log(result);
  }

  const handleDeposit = async (e) =>{
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const amount = deposit; 
    console.log(amount);
    // const amountToSend = web3.toWei(amount, "ether"); //convert to wei value
    const gas = await contractInstance.methods.sendEther(account, amount).estimateGas();
    const result = await contractInstance.methods.sendEther(account, amount).send({from:account, value: amount, gas})
    console.log(result)
  }

  return (
    <div className="App">
    <AppData></AppData>
    
      <header className="App-header">
      <Table></Table>
        <form onSubmit={handleSetProxy}>
          <label>
            Set Borrow Proxy:
            <input 
              type="text"
              name="name"
              value={borrowproxy}
              onChange={ e => setborrowproxy(e.target.value) } 
            />
          </label>
          <input type="submit" value="Set Address" />
        </form>
        <form onSubmit={handleDeposit}>
          <label>
            Deposit:
            <input 
              type="number"
              name="deposit"
              value={deposit}
              onChange={ e => setdeposit(e.target.value) }
            />
          </label>
          <input type="submit" value="Deposit" />
        </form>
        <form onSubmit={handleborrow}>
          <label>
            Borrow Amount:
            <input 
            type="number"
            name="amount to Borrow"
            value={_amountBorrowed}
            onChange={ e => setamountborrowed(e.target.value) } 
            />
            <input
              type="number"
              name="amount to Return"
              value={_amountToReturn}
              onChange={e => setamountToReturn(e.target.value)}
            />
          </label>
          <input type="submit" value="Borrow" />
        </form>
        <br/>
        <button
          onClick={handleGetProxy}
          type="button" > 
          Get Borrow Proxy Address
        </button>
        { getborrowproxy }
        <ContractBalance></ContractBalance>
      </header>
      
    </div>  
  );
}




export default App;
