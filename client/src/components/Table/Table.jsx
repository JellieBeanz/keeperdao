import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../abi'


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xFbC9728CB477C763cDe53EF1C5A769D71284D6B7'
const contractInstance = new web3.eth.Contract(abi, contractAddress)

class Table extends Component{
  componentDidMount() {
    this.loadData()
  }
  async loadData(){
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const result = await contractInstance.methods.getMyBalance(account).call();
    const accountBal = web3.utils.fromWei(result, 'ether');
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
            <th>Your Balance</th>
          </tr>
        </thead>
        <tbody>  
          <tr>
            <td>{this.state.account}</td>
            <td>{this.state.accountBal} Eth</td>
          </tr>
        </tbody>
      </table>
    </>
    )
  }
}

export default Table;
