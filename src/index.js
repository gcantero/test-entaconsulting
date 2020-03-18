import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { store } from './store/index';

ReactDOM.render(
    <BrowserRouter>
        <Provider store = {store}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
