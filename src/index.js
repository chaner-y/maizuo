import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import {HashRouter,BrowserRouter,Route,Link,NavLink} from 'react-router-dom';

import {Provider} from 'react-redux';

import 'antd-mobile/dist/antd-mobile.css';




ReactDOM.render(
    // <Provider>
        <BrowserRouter>
         <App />
        </BrowserRouter>
    /*</Provider>*/, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

