import React, { Component, useState } from 'react'
import Web3 from 'web3'
import { abi } from './abi'
import './App.css'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xBE38Fd6dF52279c13258153A123b73b0e798a7ab'
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
class Table extends Component{
  componentDidMount() {
    this.loadData()
  }
  async loadData(){
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const accountBal = await contractInstance.methods.getMyBalance().call();
    this.setState({account: account, accountBal: accountBal});
  }
  constructor(props){
    super(props)
    this.state = {account: '', accountBal: ''};
  }
  render(){
    return(
    <>
      <table>
        <thead>
          <tr>
            <th>Account Address</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>  
          <tr>
            <td>{this.state.account}</td>
            <td>{this.state.accountBal}</td>
          </tr>
        </tbody>
      </table>
    </>
    )
  }
}



function App() {
  const [borrowproxy, setborrowproxy] = useState("");
  const [getborrowproxy, setGetborrowproxy] = useState(0);
  const [_amountBorrowed, setamountborrowed] = useState(0);
  const [_amountToReturn, setamountToReturn] = useState(0);
  const [balance, getbalance] = useState(0);
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

  const handleGetBalance = async (e) =>{
    e.preventDefault();
    const result = await contractInstance.methods.getbalance().call();
    getbalance(result);
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
              type="text"
              name="name"
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
        <button
          onClick={handleGetBalance}
          type="button" > 
          Get Balance
        </button>
        { balance } ETH
      </header>
    </div>  
  );
}




export default App;
