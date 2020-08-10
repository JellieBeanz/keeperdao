import React, { Component } from 'react';
import Coin from '../Coin/Coin';

export default class CoinList extends Component {
    render() {
        return (
            <table className="coin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.props.coinData.map( value => 
              <Coin key={value.key} {...value}/>
              )}
            </tbody>
          </table>
        )
    }
}
