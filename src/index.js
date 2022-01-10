import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {requestToken, requestCode, stateManager, fetchData} from './apiFetcher';

let data = {
    timestamp: 0,
    dayName: "Loading ...",
    userId: "000000000",
    dtt: {},
    tt: {}
};
let dataState = "";

let storedData = localStorage.getItem('storedData');
console.log("StoredData: " + storedData);
if (storedData !== null) {
    let storedDataObj = JSON.parse(storedData);
    if (Date.now() <= Number(storedDataObj.timestamp)) {
        data = storedDataObj;
    }
    else {
        localStorage.removeItem('storedData');
    }
}

ReactDOM.render(
    <App data={data} dataState={dataState} />,
    document.getElementById('root')
);

async function getData() {
    await stateManager().then(res => dataState = res);
    let timestamp;
    console.log("getData is running ... " + dataState);
    let userId = "";
    let dtt = {};
    let tt = {};
    let dayName = "";
    if (dataState === 'success') {
        let checkAllGood = true;
        fetchData('idn', 'sch').then(res => res ? userId = res.studentId : checkAllGood = false);
        fetchData('dtt', 'sch').then(res => res ? dtt = res : checkAllGood = false);
        fetchData('tt', 'sch').then(res => res ? tt = res : checkAllGood = false);
        fetchData('wk', 'sch').then(res => res ? dayName = (res.day + " " + res.week + res.weekType) : checkAllGood = false);
        if (checkAllGood) {
            timestamp = Date.parse(dtt.date + "T23:59:59").toString();
            data = {
                timestamp: timestamp,
                dayName: dayName,
                userId: userId,
                dtt: dtt,
                tt: tt
            };
            localStorage.setItem('storedData', JSON.stringify(data));
        }
        else {
            dataState = 'askToLogin';
        }
    }
    console.log("State data: " + "\n" + dataState + "\n" + userId + "\n" + dtt + "\n" + tt + "\n" + dayName);
}

getData()
    .then(() => ReactDOM.render(<App data={data} dataState={dataState} />, document.getElementById('root')))
    .then(() => console.log(localStorage.getItem('handle_access')));


// document.getElementById("redirect_to_login").onclick = requestCode;


