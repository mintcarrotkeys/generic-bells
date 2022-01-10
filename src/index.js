import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



// const result = organiser();
localStorage.setItem('storedData', JSON.stringify({
    timestamp: 1641796707000,
    dayName: "Demo displayed",
    userId: "999888777",
    dtt: {},
    tt: []
}));

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// document.getElementById("redirect_to_login").onclick = requestCode;


