import React from 'react';
// import { Link } from 'react-router-dom';

import './Details.css';
import axios from 'axios';
// import moment from 'moment';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    // this.handleDate = this.handleDate.bind(this);
    // this.handleDaily = this.handleDaily.bind(this);
  }

  handleClick = (data) => {
    let symbol = data;
    console.log(symbol, 'stock');

    // const key = 'S5KUOUOILZEAPDNE';
    // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${key}&datatype=csv`;
    // window.open(url, '_blank');
  };

  // let handleDaily = (data) => {
  //   let symbol = data;
  //   console.log(symbol, 'stock');

  //   const key = 'S5KUOUOILZEAPDNE';
  //   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${key}&datatype=csv`;
  //   window.open(url, '_blank');
  // };
  componentDidMount() {
    console.log(this.props.location.state.ticker, 'props');

    let symbol = this.props.location.state.ticker;
    const key = 'toPW3zJRmvq_rh1q1JKO8F0eeGkQ_BJ775UhmH';
    const url = `https://api.polygon.io/v1/meta/symbols/${symbol}/company?apiKey=${key}`;

    axios.get(url);
    axios
      .get(url)
      // .then((response) => {
      //   console.log(res.data, 'search data');
      // })
      .then((response) => {
        console.log(response, 'details response');
        this.setState({ data: response.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    // console.log(this.props, 'props');
    return (
      <div>
        <li className='StockListItem'>
          <div className='StockListItem_Time'>
            <img src={this.state.data.logo} alt={this.state.data.name} />
          </div>
          <br />
          <div className='StockListItem_Symbol'>
            <span>Name: </span>
            {this.state.data.name}
          </div>

          <div className='StockListItem_Symbol'>
            <span>Ceo: </span>
            {this.state.data.ceo}
          </div>
          <div className='StockListItem_Symbol'>
            <span>List Date: </span>
            {this.state.data.listdate}
          </div>
          <div className='StockListItem_Price'>
            <span>Status: </span>
            {this.state.data.active ? 'active' : 'dormant'}
          </div>
          <div className='StockListItem_Symbol'>
            <span>Market-cap: </span>
            {this.state.data.marketcap}
          </div>
          <div className='StockListItem_Price'>
            <span>Sector: </span>
            {this.state.data.sector}
          </div>
          <div className='StockListItem_Price'>
            <span>Industry: </span>
            {this.state.data.industry}
          </div>
          <div className='StockListItem_Price'>
            <span>HeadQuarters Address: </span>
            {this.state.data.hq_address} {this.state.data.hq_state}{' '}
            {this.state.data.hq_country}
          </div>
          <div className='StockListItem_Price'>
            <span>Country: </span>
            {this.state.data.country}
          </div>
          <div className='StockListItem_Price'>
            <span>Description: </span>
            {this.state.data.description}
          </div>
          <div className='StockListItem_Price'>
            <span>Exchange: </span>
            {this.state.data.exchange}
            {' ('}
            {this.state.data.exchangeSymbol}
            {')'}
          </div>
          <div className='StockListItem_Price'>
            <span>Phone: </span>
            {this.state.data.phone}
          </div>

          {/* <div className='StockListItem_Price'>
        <span>Price: </span>${parseInt(stock.price).toFixed(2)}
      </div> */}
          <div className='StockListItem_Volume'>
            <span>Employees: </span>

            {this.state.data.employees}
          </div>
          <div className='StockListItem_Symbol'>
            <span>cik: </span>
            {this.state.data.cik}
          </div>
          <div className='StockListItem_Symbol'>
            <span>lei: </span>
            {this.state.data.lei}
          </div>
          <div className='StockListItem_Time'>
            <span>Sic: </span>
            {this.state.data.sic}
          </div>
          <div className='StockListItem_Time'>
            <span>Type: </span>
            {this.state.data.type}
          </div>
          <div className='StockListItem_Time'>
            <span>URL: </span>
            {this.state.data.url}
          </div>
          <div className='StockListItem_Time'>
            <span>Updated: </span>
            {this.state.data.updated}
          </div>

          <br />
          {/* <Link
            to={{
              pathname: '/stock',
              state: {
                ticker: this.state.data.symbol,
              },
            }}
          >
            To Stocks Data
          </Link> */}
        </li>
      </div>
    );
  }
}
export default Details;
