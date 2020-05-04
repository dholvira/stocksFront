import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SearchData from './components/SearchData/SearchData';
import Details from './components/Details/Details';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      {/* <ul> */}
      {/* <li> */}
      <Link to='/' style={{ color: 'black' }}>
        <button style={{ marginLeft: '5px', marginTop: '5px' }} type='button'>
          Home
        </button>
      </Link>
      {/* </li> */}
      {/* <li>
          <Link to='/stock'>Stock</Link>
        </li> */}
      {/* </ul> */}
      <Route exact path='/' component={App} />
      <Route path='/stock' component={SearchData} />
      <Route path='/details' component={Details} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
