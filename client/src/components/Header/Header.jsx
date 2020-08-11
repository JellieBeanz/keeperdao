import React, { Component } from 'react'
import logo from '../../logo.svg';

export default class Header extends Component {
        componentDidMount() {
          this.loadData()
        }
        async loadData(){
          const accounts = window.ethereum.enable();
          const account = accounts[0];
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

