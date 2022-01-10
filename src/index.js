import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {requestToken, requestCode, stateManager, fetchData, organiser} from './apiFetcher';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);




// document.getElementById("redirect_to_login").onclick = requestCode;


