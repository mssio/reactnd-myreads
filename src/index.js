import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import Router from 'app/router';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </div>,
  document.getElementById('root'));
