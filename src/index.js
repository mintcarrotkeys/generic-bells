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

async function getData() {
    dataState = await stateManager();
    let timestamp = 0;
    console.log("getData is running ... " + dataState);
    let userId = "";
    let dtt = {};
    let tt = {};
    let dayName = "";
    let weekData = false;
    if (dataState === 'success') {
        let checkAllGood = true;
        await Promise.all([
            fetchData('idn', 'sch').then(res => userId = res.studentId),
            fetchData('dtt', 'sch').then(res => dtt = res),
            fetchData('tt', 'sch').then(res => tt = res),
            fetchData('wk', 'sch').then(res => weekData=res)
                .then(() => weekData ? dayName = (weekData.day + " " + weekData.week + weekData.weekType) : dayName = "")
        ]);

        if (checkAllGood) {
            timestamp = Date.parse(dtt.date + "T23:59:59").toString();
            data = {
                'timestamp': timestamp,
                'dayName': dayName,
                'userId': userId,
                'dtt': dtt,
                'tt': tt
            };
            localStorage.setItem('storedData', JSON.stringify(data));
        }
        else {
            dataState = 'askToLogin';
        }
    }
    console.log("State data: " + "\n" + dataState + "\n" + userId + "\n" + dtt + "\n" + tt + "\n" + dayName);
}

getData().then(() => ReactDOM.render(
    <App data={data} dataState={dataState} />,
    document.getElementById('root')
)
);


// document.getElementById("redirect_to_login").onclick = requestCode;


