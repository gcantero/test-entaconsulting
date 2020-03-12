import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// font-awesome
import 'font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
