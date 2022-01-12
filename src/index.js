import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {requestToken, requestCode, stateManager, fetchData} from './apiFetcher';


// let TESTDATA = ;
//
// let today = new Date();
// today = new Date(today.getTime() + (11*60*60*1000));
// // console.log(today);
// TESTDATA.dtt.date = today.toISOString().split('T')[0];
// TESTDATA.timestamp = Date.parse(TESTDATA.dtt.date + "T23:59:59");
// // console.log(TESTDATA.timestamp)
// // console.log(today.toISOString().split('T')[0]);
//
// // console.log(JSON.stringify(TESTDATA));
//
// localStorage.setItem("storedData", JSON.stringify(TESTDATA));


let data = {
    timestamp: 0,
    dayName: "Loading ...",
    userId: "000000000",
    dtt: {},
    tt: {}
};

let dataState = "";

let storedData = localStorage.getItem('storedData');
// console.log("StoredData: " + storedData);
if (storedData !== null) {
    let storedDataObj = JSON.parse(storedData);
    if (Date.now() <= Number(storedDataObj.timestamp)) {
        data = storedDataObj;
    }
    else {
        localStorage.removeItem('storedData');
    }
}

// ReactDOM.render(
//     <App data={data} dataState={dataState} />,
//     document.getElementById('root')
// );

async function getData() {
    dataState = await stateManager();
    let timestamp = 0;
    // console.log("getData is running ... " + dataState);
    let userId = "";
    let dtt = {};
    let tt = {};
    let dayName = "";
    let weekData = false;
    let x;
    if (dataState === 'success') {
        let checkAllGood = true;
        const source = "sch";
        await Promise.all([
            fetchData('idn', source).then(res => userId = res.studentId)
                .then(() => userId ? x=false : checkAllGood=false),
            fetchData('dtt', source).then(res => dtt = res)
                .then(() => dtt ? x=false : checkAllGood=false),
            fetchData('tt', source).then(res => tt = res)
                .then(() => tt ? x=false : checkAllGood=false),
            fetchData('wk', source).then(res => weekData=res)
                .then(() => weekData ? dayName = (weekData.day + " " + weekData.week + weekData.weekType) : checkAllGood=false)
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
            console.log("Error fetching data.");
            dataState = 'askToLogin';
        }
        console.log(userId + "\n" + dtt + "\n" + tt + "\n" + weekData);
    }
}

getData().then(() => ReactDOM.render(
    <App data={data} dataState={dataState} />,
    document.getElementById('root')
)
);



