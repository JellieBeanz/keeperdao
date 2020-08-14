import React, { Component, ReactDOM } from 'react';
import Web3 from 'web3';
import { abi } from '../../abi'
import { render } from '@testing-library/react';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xEB7e15B4E38CbEE57a98204D05999C3230d36348'
export const contractInstance = new web3.eth.Contract(abi, contractAddress)

class Deposits extends Component {
    componentDidMount(){
        
    }
   
}


    


export default Deposits;
