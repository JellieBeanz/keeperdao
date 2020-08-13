import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../abi'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0x6Ae9ABb1bF694E553137b206bed0496f6f9D4FcE'
const contractInstance = new web3.eth.Contract(abi, contractAddress)

class ContractBalance extends Component{
  componentDidMount() {
    this.loadData()
  }
  async loadData(){
    const result = await contractInstance.methods.getbalance().call();
    const balance = web3.utils.fromWei(result, 'ether');
    this.setState({balance: balance});
    }
  constructor(props){
      super(props)
      this.state = {balance: ''};
    }
  render(){
    return(
      <>
      <p>Contact Balance: {this.state.balance} Eth</p>
      </>
    )
  }
}
export default ContractBalance;
