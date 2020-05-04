import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

import SearchBar from './components/SearchBar/SearchBar';
import StockList from './components/StockList/StockList';
import { SpinnerRound, SpinnerRomb } from 'spinners-react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      stocks: [],
      term: null,
      value: '',
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleClick(e) {
    if (e) e.preventDefault();
    this.setState({
      value: '',
      loading: true,
      term: this.state.value,
    });

    let term = this.state.value;
    const key = 'toPW3zJRmvq_rh1q1JKO8F0eeGkQ_BJ775UhmH';
    // const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${key}`;
    const url = `https://api.polygon.io/v2/reference/tickers?sort=ticker&search=${term}&perpage=50&page=1&apiKey=${key}`;
    axios
      .get(url)
      .then((res) => {
        // console.log(res, 'search data');
        this.setState({ loading: false });
        let stocks = _.flattenDeep(
          Array.from(res.data.tickers).map((stock) => [
            {
              key: stock.ticker,
              name: stock.name,
              locale: stock.locale,
              active: stock.active,
              market: stock.market,
              primaryExch: stock.primaryExch,
              updated: stock.updated,
              url: stock.url,
              currency: stock.currency,
            },
          ])
        );
        // console.log(stocks);
        this.setState((state, props) => {
          return {
            ...state,
            stocks,
          };
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    let stocks = this.state.stocks;
    const value = this.state.value;

    return (
      <div className='App'>
        <h1 className='App__Title'>Stock Search</h1>
        <SearchBar
          value={value}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <SpinnerRomb enabled={this.state.loading} size='90' color='white' />
        <StockList stockItems={stocks} />
      </div>
    );
  }
}

export default App;
