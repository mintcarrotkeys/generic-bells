import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {saveItem} from "./version";


// let TESTDATA = ;
//
//
// saveItem('storedData', TESTDATA);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

//TODO: PREFLIGHT: serviceworker
serviceWorkerRegistration.register();