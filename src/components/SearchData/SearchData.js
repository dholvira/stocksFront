import React from 'react';

import './SearchData.css';
import axios from 'axios';
import moment from 'moment';
import { SpinnerRomb } from 'spinners-react';
import Datetime from 'react-datetime';
// import DatePicker from 'react-datepicker';

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

class SearchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0,
      timestampLimit: '',
      toggle: false,
      activePage: 1,
      length: 0,
      selectedDate: new Date(),
      range: false,
      loading: false,
      searchdate: '',
      data: [],
      datas: [],
      table: {},
      total_records: '',
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleDaily = this.handleDaily.bind(this);
    this.handleDate = this.handleDate.bind(this);
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
    // this.state.table.destroy();

    this.setState({ table: {}, loading: true });
    let symbol = data;
    let date = this.state.searchdate;
    // let date = '2020-05-04';
    let timestamp = this.state.timestamp;
    // let timestampLimit = '1588633200000000000';
    let timestampLimit = this.state.timestampLimit;
    // let timestamp = '1588597200000000000';
    // &timestamp=${timestamp}&timestampLimit=${timestampLimit}
    let limit = 1000;
    const key = 'toPW3zJRmvq_rh1q1JKO8F0eeGkQ_BJ775UhmH';
    const url1 = `https://api.polygon.io/v2/ticks/stocks/trades/${symbol}/${date}?limit=${limit}&apiKey=${key}&timestamp=${timestamp}&timestampLimit=${timestampLimit}&reverse=0`;
    const url2 = `https://api.polygon.io/v2/ticks/stocks/trades/${symbol}/${date}?limit=${limit}&apiKey=${key}&reverse=0`;
    if (this.state.range) {
      var url = url1;
    } else {
      url = url2;
    }
    axios
      .get(url)
      // .then((response) => {
      //   console.log(res.data, 'search data');
      // })
      .then((response) => {
        console.log(response, 'response');
        this.setState({ total_records: response.data.results.results_count });
        this.setState({ loading: false });

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
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };
  handleStartDate(startdate) {
    this.setState({ searchdate: startdate.format('YYYY-MM-DD') });
    this.setState({ timestamp: startdate.unix() * 1000000000 });
  }
  handleEndDate(enddate) {
    this.setState({ timestampLimit: enddate.unix() * 1000000000 });
    // console.log(this.state.timestampLimit, 'enddate set');
  }
  handleDate(date) {
    console.log(date, 'now date');
    this.setState({ searchdate: date.format('YYYY-MM-DD') });
    // console.log(this.state.searchdate, 'only date');
  }
  handleRange() {
    this.setState({ range: !this.state.range });
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
          <td>{item.q}</td>
          <td>{item.p}</td>
          <td>{item.i}</td>
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

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <button
            style={{
              width: '10%',
              fontSize: '12px',
              borderRadius: '9px',
            }}
            onClick={() => this.handleRange()}
          >
            Switch Search Type
          </button>
          {this.state.range ? (
            <div
              style={{
                display: 'flex ',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                margin: '10px',
              }}
            >
              <div>
                <span>Start Date-Time: </span>

                <Datetime
                  // value={this.state.selectedDate}
                  onChange={this.handleStartDate}
                />
              </div>
              <div style={{ marginLeft: '20px' }}>
                <span>End Date-Time: </span>
                <Datetime
                  defaultValue={this.state.selectedDate}
                  onChange={this.handleEndDate}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex ',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                margin: '10px',
              }}
            >
              <span>Select Date: </span>

              <Datetime
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                defaultValue={this.state.selectedDate}
                inputProps={{
                  placeholder: 'Date Picker Here',
                }}
                onChange={this.handleDate}
                // timeFormat={false}
              />
            </div>
          )}

          {/* </MuiPickersUtilsProvider> */}

          <br />

          <br />
          <button
            style={{
              width: '10%',
            }}
            onClick={() =>
              this.handleDaily(this.props.location.state.ticker.ticker)
            }
          >
            Show Data{' '}
          </button>
          <br />

          <br />
          <div style={{ marginLeft: '50%' }}>
            {' '}
            <SpinnerRomb enabled={this.state.loading} />
          </div>
          <br />

          <table
            id='example'
            className='display'
            width='100%'
            ref={(el) => (this.el = el)}
          >
            <thead>
              <tr role='row'>
                <th>Sequence Number</th>

                <th>Price</th>
                <th>Id</th>

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
