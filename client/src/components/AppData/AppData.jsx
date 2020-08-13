import React, { Component } from 'react';
import Web3 from 'web3';
import { abi } from '../../abi'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress =  '0xFbC9728CB477C763cDe53EF1C5A769D71284D6B7'
const contractInstance = new web3.eth.Contract(abi, contractAddress)

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

export default AppData;