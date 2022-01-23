import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { passItem, saveItem } from "./version";


// let TESTDATA =


// let today = new Date();
// today = new Date(today.getTime() + (11*60*60*1000));
// // console.log(today);
// TESTDATA.dtt.date = today.toISOString().split('T')[0];
// TESTDATA.timestamp = Date.parse(TESTDATA.dtt.date + "T23:59:59");
// // console.log(TESTDATA.timestamp)
// // console.log(today.toISOString().split('T')[0]);
//
// // console.log(JSON.stringify(TESTDATA));

// saveItem('storedData', TESTDATA);


ReactDOM.render(
    <App />,
    document.getElementById('root')
    );