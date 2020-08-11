import React, { Component, useState } from 'react'
import Web3 from 'web3'
import { abi } from './abi'
import './App.css'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xEA5F7d07D17cd2e32586E9f4c0328b0df048E210'
const contractInstance = new web3.eth.Contract(abi, contractAddress)
console.log(contractInstance);

class AppData extends Component{
  componentDidMount() {
    this.loadData()
  }
  async loadData(){
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account)
    const owner = await contractInstance.methods.owner().call();
    this.setState({account: account, owner: owner})
  }
  constructor(props){
    super(props)
    this.state = {account: '', owner: ''}
  }
  render(){
    return(
      <>
      <div className="name">
        Contract Address: {contractAddress}
      </div>
      <div className="name">
        Connected With: {this.state.account}
      </div>
      <div className="name">
        Owner: {this.state.owner}
      </div>
      </>
    )
    
  }
}



function App() {
  const [borrowproxy, setborrowproxy] = useState(0);
  const [getborrowproxy, setGetborrowproxy] = useState(0);
  const [_amountBorrowed, setamountborrowed] = useState(0);
  const [_amountToReturn, setamountToReturn] = useState(0);

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

  return (
    <div className="App">
    <AppData></AppData>
      <header className="App-header">
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
      </header>
    </div>  
  );
  
}




export default App;
