import React, {useState} from 'react';
import PageBells from "./pages/PageBells";
import Nav from "./components/Nav";
import PageBarcode from "./pages/PageBarcode";
import PageTimetable from "./pages/PageTimetable";
import PageFeeds from "./pages/PageFeeds";
import PageSettings from "./pages/PageSettings";
import DataMessage from "./components/DataMessage";
import {apiDataHandler} from "./apiDataHandler";
import {requestToken, requestCode, stateManager, fetchData} from './apiFetcher';


function App(props) {

    let data = {
        timestamp: 1641796707000,
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
                timestamp = Date.parse(dtt.date + "T23:59:59");
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
        .then(() => console.log(localStorage.getItem('handle_access')));

    let pageBells = (<PageBells dayName={data.dayName} data={apiDataHandler(data.dtt)} />);
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} />);
    let pageFeeds = (<PageFeeds />);
    let pageSettings = (<PageSettings />);

    const [currentPage, setCurrentPage] = useState(pageBells);

    function reportClicked(name) {
        // console.log(name);
        // console.log("Hi")
        // console.log(currentPageId);
        if (name === "barcode") {
            setCurrentPage(pageBarcode);
        }
        else if (name === "timetable") {
            setCurrentPage(pageTimetable);
        }
        else if (name === "bells") {
            setCurrentPage(pageBells);
        }
        else if (name === "feeds") {
            setCurrentPage(pageFeeds);
        }
        else if (name === "settings") {
            setCurrentPage(pageSettings);
        }
    }

    const output = (
        <div className="app-container">
            <div className="page">
                {dataState === "askToLogin" ? <DataMessage /> : ""}
                {currentPage}
            </div>
            <Nav reportClicked={reportClicked} initialPage="bells" />
        </div>
    );

    return output;
}

export default App;
