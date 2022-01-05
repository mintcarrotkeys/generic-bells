import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  { apiDataHandler } from "./apiDataHandler";


//add data here to test.
let apiData = {};

// fetch("data.json")
//     .then(response => response.json())
//     .then(json => apiData);

const routineData = apiDataHandler(apiData);

ReactDOM.render(
    <App routineData={routineData} />,
  document.getElementById('root')
);

