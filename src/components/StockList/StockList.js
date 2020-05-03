import React from 'react';
import StockListItem from '../StockListItem/StockListItem';
import './StockList.css';

const StockList = (props) => {
  const stockItem = props.stockItems.map((stock, key) => {
    return (
      <StockListItem
        key={stock.key}
        ticker={stock.key}
        name={stock.name}
        locale={stock.locale}
        market={stock.market}
        updated={stock.updated}
        primaryExch={stock.primaryExch}
        url={stock.url}
        currency={stock.currency}

        // timestamp={stock.timestamp}
      />
    );
  });

  return <ul className='StockList'>{stockItem}</ul>;
};

export default StockList;
