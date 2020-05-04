import React from 'react';
import './StockListItem.css';
import axios from 'axios';
// import SearchData from '../SeachData/SearchData';
import { Link } from 'react-router-dom';

// import DatePicker from 'react-datepicker';

const StockListItem = (stock, props) => {
  // const [end, setEnd] = useState('');

  let handleClick = (data) => {
    let symbol = data;
    console.log(symbol, 'stock');

    const key = 'S5KUOUOILZEAPDNE';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${key}&datatype=csv`;
    window.open(url, '_blank');
    axios
      .get(url)
      .then((res) => {
        console.log(res.data, 'search data');
      })
      .catch((error) => console.log(error));
  };

  // let handleDaily = (data) => {
  //   let symbol = data;
  //   console.log(symbol, 'stock');

  //   const key = 'S5KUOUOILZEAPDNE';
  //   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${key}&datatype=csv`;
  //   window.open(url, '_blank');
  // };

  return (
    <li className='StockListItem'>
      <div className='StockListItem_Symbol'>
        <span>Name: </span>
        {stock.name}
      </div>

      <div className='StockListItem_Symbol'>
        <span>Stock: </span>
        {stock.ticker}
      </div>
      <div className='StockListItem_Price'>
        <span>Market: </span>
        {stock.market}
      </div>
      <div className='StockListItem_Price'>
        <span>Region: </span>
        {stock.locale}
      </div>
      {/* <div className='StockListItem_Price'>
        <span>Price: </span>${parseInt(stock.price).toFixed(2)}
      </div> */}
      <div className='StockListItem_Volume'>
        <span>Updated: </span>

        {stock.updated}
      </div>
      <div className='StockListItem_Time'>
        <span>Currency: </span>
        {stock.currency}
      </div>
      <div className='StockListItem_Time'>
        <span>Primary Exchange: </span>
        {stock.primaryExch}
      </div>
      {/* <input
        value={start}
        onChange={(event) => setStart(event.target.value)}
        name='start'
        type='text'
      /> */}
      {/* <DatePicker selected={start} onChange={setStart} />
      <DatePicker selected={end} onChange={setEnd} /> */}

      <br />
      <button onClick={() => handleClick(stock.ticker)}>
        Download intraday{' '}
      </button>
      <br />

      <Link
        to={{
          pathname: '/stock',
          state: {
            ticker: stock,
          },
        }}
      >
        <button type='button'>Stocks Data</button>
      </Link>
      <br />
      <Link
        to={{
          pathname: '/details',
          state: {
            ticker: stock.ticker,
          },
        }}
      >
        <button type='button'>Details</button>
      </Link>
    </li>
  );
};
export default StockListItem;
