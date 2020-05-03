import React from 'react';

import './SearchData.css';
import axios from 'axios';
import ReactDatetime from 'react-datetime';
import moment from 'moment';

const $ = require('jquery');
require('jszip');
require('pdfmake');
require('pdfmake/build/vfs_fonts.js');
$.DataTable = require('datatables.net-dt');
require('datatables.net-buttons-dt');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-responsive-dt');
require('datatables.net-select-dt');
// import DatePicker from 'react-datepicker';

class SearchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      breaksCount: '',
      toggle: false,
      activePage: 1,
      length: 0,
      totalSections: 0,
      activeSection: 0,
      date: '',
      data: [],
      datas: [],
      table: {},
      total_records: '',
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleDaily = this.handleDaily.bind(this);
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

  handleDaily = (data) => {
    let symbol = data;
    let date = this.state.date;
    // let timestamp = '1560475800';
    // let timestampLimit = '';
    // let timestampLimit = '1560476100';
    // let timestamp = null;
    // &timestamp=${timestamp}&timestampLimit=${timestampLimit}
    let limit = 5000;
    const key = 'toPW3zJRmvq_rh1q1JKO8F0eeGkQ_BJ775UhmH';
    const url = `https://api.polygon.io/v2/ticks/stocks/trades/${symbol}/${date}?limit=${limit}&apiKey=${key}&reverse=1`;
    axios.get(url);
    axios
      .get(url)
      // .then((response) => {
      //   console.log(res.data, 'search data');
      // })
      .then((response) => {
        console.log(response, 'response');
        this.setState({ total_records: response.data.results.results_count });
        // this.setState({ rows: response.data.map });

        this.setState({ data: response.data.results });
        const tbobj = $('#example').DataTable({
          //  lengthMenu: [[10, 25, 50, -1], [20, 30, 50, "All"]],
          destroy: true,
          pageLength: 10,
          columnDefs: [
            {
              type: 'unix',
              targets: 6,
              render: function (data) {
                return moment(parseInt(data / 1000000)).format(
                  'dddd MMMM Do YYYY, h:mm:ss a'
                );
              },
            },
            {
              type: 'unix',
              targets: 4,
              render: function (data) {
                return moment(parseInt(data / 1000000)).format(
                  'dddd MMMM Do YYYY, h:mm:ss a'
                );
              },
            },
            {
              targets: 0,
              orderable: false,
            },
          ],
          pagingType: 'full_numbers',
          responsive: true,
          dom: 'Bfrtip',
          buttons: [
            {
              extend: 'copy',
              title: 'Report',
            },
            // {
            //   extend: 'print',
            //   title: 'Payments'
            // },
            {
              extend: 'csv',
              title: 'Report',
            },
          ],
        });

        this.setState({ table: tbobj });
      })
      .catch((error) => console.log(error));
  };
  handleDate(date) {
    this.setState({ date: moment(date).format('YYYY-MM-DD') });
  }
  // componentDidMount() {
  //   this.setState({ datas: this.props.location.state.ticker });
  // }
  render() {
    // console.log(this.state.datas, 'datas');
    const eodList = this.state.data;

    const tblrow = (item, index) => {
      return (
        <tr key={index} style={{ alignContent: 'center' }}>
          <td>{item.i}</td>
          <td>{item.p}</td>
          <td>{item.q}</td>
          <td>{item.s}</td>
          {/* <td>
            {moment.unix(item.t).format('dddd MMMM Do YYYY, h:mm:ss a')}
          </td> */}
          <td>{item.t}</td>
          <td>{item.x}</td>
          <td>{item.y}</td>
          {/* <td>{moment.unix(item.y).format('dddd MMMM Do YYYY, h:mm:ss a')}</td> */}

          {/* <td>{Math.round(((item.total_time / 60) * 10) / 10)}</td> */}
        </tr>
      );
    };
    return (
      <div>
        <li className='StockListItem'>
          <div className='StockListItem_Symbol'>
            <span>Name: </span>
            {this.props.location.state.ticker.name}
          </div>

          <div className='StockListItem_Symbol'>
            <span>Ticker: </span>
            {this.props.location.state.ticker.ticker}
          </div>
          <div className='StockListItem_Price'>
            <span>Market: </span>
            {this.props.location.state.ticker.market}
          </div>
          <div className='StockListItem_Price'>
            <span>Region: </span>
            {this.props.location.state.ticker.locale}
          </div>

          <div className='StockListItem_Volume'>
            <span>Updated: </span>

            {this.props.location.state.ticker.updated}
          </div>
          <div className='StockListItem_Time'>
            <span>Currency: </span>
            {this.props.location.state.ticker.currency}
          </div>
          <div className='StockListItem_Time'>
            <span>Primary Exchange: </span>
            {this.props.location.state.ticker.primaryExch}
          </div>
          <br />

          <ReactDatetime
            inputProps={{
              placeholder: 'Date Picker Here',
            }}
            onChange={this.handleDate}
            timeFormat={false}
          />

          <br />

          <br />
          <button
            style={{ width: '20%', borderRadius: '8px', fontSize: '16px' }}
            onClick={() =>
              this.handleDaily(this.props.location.state.ticker.ticker)
            }
          >
            Show Data{' '}
          </button>
          <br />

          <br />
          <br />

          <table
            id='example'
            className='display'
            width='100%'
            ref={(el) => (this.el = el)}
          >
            <thead>
              <tr role='row'>
                <th>Id</th>
                <th>Price</th>
                <th>Sequence Number</th>
                <th>Size</th>
                <th>SIP timestamp</th>
                <th>exchange</th>
                <th>Participant Timestamp</th>
              </tr>
            </thead>
            <tbody>{eodList.map((item, index) => tblrow(item, index))}</tbody>
          </table>
        </li>
      </div>
    );
  }
}
export default SearchData;
