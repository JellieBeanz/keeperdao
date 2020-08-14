import React, { useState, useEffect, Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { abi } from './abi'
import { render } from '@testing-library/react';
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";



const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xEB7e15B4E38CbEE57a98204D05999C3230d36348'
export const contractInstance = new web3.eth.Contract(abi, contractAddress)
console.log(contractInstance);

// contractInstance.getPastEvents('Deposited', {fromBlock: 0, toBlock: 'latest'}, function(error, events){ console.log(events); })
// .on('data', function(event){
//   console.log(event); // same results as the optional callback above
// })




function App() {
  const [resourceType, setResourceType] = useState('deposits')


  useEffect(() => {

    if (resourceType === 'deposits') {
      contractInstance.events.Deposited({
        fromBlock: 106
      }).on('data', async function (event) {
        const amount = web3.utils.fromWei(event.returnValues[2], 'ether');
        const mintAmount = web3.utils.fromWei(event.returnValues[3], 'ether');
        render(
          <>
            <table id="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Minted Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{event.returnValues[0]}</td>
                  <td>{event.returnValues[1]}</td>
                  <td>{amount}</td>
                  <td>{mintAmount}</td>
                </tr>
              </tbody>
            </table>
          </>, document.getElementById('tableInfo')

        )

      }

      )
      return () => {
        document.getElementById('tableInfo').innerHTML = '';
      }
    } else if (resourceType === 'withdrawls') {
      contractInstance.events.Withdrew({
        fromBlock: 106
      }).on('data', function (event) {
        console.log(event); // log event in terminal
        render(
          <>
            <table id="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Withdrawer</th>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Burn Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{event.returnValues[0]}</td>
                  <td>{event.returnValues[1]}</td>
                  <td>{event.returnValues[2]}</td>
                  <td>{event.returnValues[3]}</td>
                  <td>{event.returnValues[4]}</td>
                </tr>
              </tbody>
            </table>
          </>, document.getElementById('tableInfo')


        )
      })
      return () => {
        document.getElementById('tableInfo').innerHTML = '';
      }
    } else if (resourceType === 'borrow') {
      contractInstance.events.Borrowed({
        fromBlock: 106
      }).on('data', function (event) {
        console.log(event); // log event in terminal
        render(
          <>
            <table id="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{event.returnValues[0]}</td>
                  <td>{event.returnValues[1]}</td>
                  <td>{event.returnValues[2]}</td>
                  <td>{event.returnValues[3]}</td>
                </tr>
              </tbody>
            </table>
          </>, document.getElementById('tableInfo')

        )
      })
      return () => {
        document.getElementById('tableInfo').innerHTML = '';
      }
    }
  }, [resourceType])

  return (
    <>
      <div>
        <button onClick={() => setResourceType('deposits')}>deposits</button>
        <button onClick={() => setResourceType('withdrawls')}>withdrawls</button>
        <button onClick={() => setResourceType('borrow')}>borrow</button>
      </div>
      <h1>{resourceType}</h1>
      <AppClass></AppClass>
    </>
  );
}
class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<AppClass />, document.getElementById("tableInfo"));

export default App;
