import React, {useState} from 'react';
import PageBells from "./pages/PageBells";
import Nav from "./components/Nav";
import PageBarcode from "./pages/PageBarcode";
import PageTimetable from "./pages/PageTimetable";
import PageFeeds from "./pages/PageFeeds";
import PageSettings from "./pages/PageSettings";
import DataMessage from "./components/DataMessage";
import {apiDataHandler} from "./apiDataHandler";
import {requestToken, requestCode, stateManager, fetchData, organiser} from './apiFetcher';


function App(props) {

    const [dataState, setDataState] = useState('');
    const [userId, setUserId] = useState('');
    const [dtt, setdtt] = useState([]);
    const [tt, settt] = useState({});
    const [dayName, setDayName] = useState("Loading...");
    setUserId("401235678");

    let storedData = localStorage.getItem('storedData');
    console.log("StoredData: " + storedData);
    if (storedData !== null) {
        let datapack = JSON.parse(storedData);
        if (Date.now() <= Number(datapack.timestamp)) {
            setUserId(datapack.userId);
            setdtt(datapack.dtt);
            settt(datapack.tt);
            setDayName(datapack.dayName);
        }
        else {
            localStorage.removeItem('storedData');
        }
    }

    async function getData() {
        await stateManager().then(res => setDataState(res));
        let timestamp;
        console.log("getData is running ... " + dataState);
        if (dataState === 'success') {
            let checkAllGood = true;
            fetchData('idn', 'sch').then(res => res ? setUserId(res.studentId) : checkAllGood = false);
            fetchData('dtt', 'sch').then(res => res ? setdtt(res) : checkAllGood = false);
            fetchData('tt', 'sch').then(res => res ? settt(res) : checkAllGood = false);
            fetchData('wk', 'sch').then(res => res ? setDayName(res.day + " " + res.week + res.weekType) : checkAllGood = false);
            if (dtt != false) {
                timestamp = Date.parse(dtt.date + "T23:59:59");
            }
            if (checkAllGood) {
                localStorage.setItem('storedData', JSON.stringify({
                    timestamp: timestamp,
                    dayName: dayName,
                    userId: userId,
                    dtt: dtt,
                    tt: tt
                }));
            }
        }
    }
    console.log("State data: " + dataState + "\n" + userId + "\n" + dtt + "\n" + tt + "\n" + dayName);
    getData();
    console.log("State data: " + dataState + "\n" + userId + "\n" + dtt + "\n" + tt + "\n" + dayName);

    let pageBells = (<PageBells dayName={dayName} data={apiDataHandler(dtt)} />);
    let pageBarcode = (<PageBarcode userIdCode={userId} />);
    let pageTimetable = (<PageTimetable data={tt} />);
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
