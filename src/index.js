import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {saveItem, saveStr} from "./version";
import {displaySettings, storedData} from "./demo data/storedData_1";

//TODO: PREFLIGHT: remove testing data

let TESTDATA = storedData;
saveStr('usedApp', "yes");
saveItem('displaySettings', displaySettings);

saveItem('storedData', TESTDATA);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

//TODO: PREFLIGHT: serviceworker - turn off dev build first!
serviceWorkerRegistration.register();