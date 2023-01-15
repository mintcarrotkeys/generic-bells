import React, { useState, useEffect } from 'react';
import PageBells from "./pages/PageBells";
import Nav from "./components/Nav";
import PageBarcode from "./pages/PageBarcode";
import PageTimetable from "./pages/PageTimetable";
import PageFeeds from "./pages/PageFeeds";
import PageSettings from "./pages/PageSettings";
import DataMessage from "./components/DataMessage";
import {passItem, passStr, saveItem} from "./version";
import {getData, getWeekNum} from "./apiFetcher";
import {bellRoutines} from "./assets/defaultBells";
import About from "./About";


function App() {
    function synthDTT(input) {
        let output = {
            "status": "OK",
            "date": "",
            "roomVariations": [],
            "classVariations": {},
            "serverTimezone": "39600",
            "shouldDisplayVariations": false,
            bells: [],
            timetable: {},
        }

        let today = new Date();
        let showDay;
        let dayDiff;
        if (today.getHours() >= 16) {
            let millisInDay = 86400000;
            let timeNow = today.getTime();
            today = new Date((Math.floor(timeNow / millisInDay) * millisInDay) + millisInDay + 10000);
            // console.log("detected afternoon");
        }
        if (today.getDay() === 6) {
            showDay = today.getTime() + 2*24*60*60*1000;
            dayDiff = 1;
        }
        else if (today.getDay() === 0) {
            showDay = today.getTime() + 24*60*60*1000;
            dayDiff = 1;
        }
        else {
            showDay = today.getTime();
            dayDiff = today.getDay();
        }
        // console.log(showDay);
        // console.log(displayData);

        let weekNo = getWeekNum(showDay);
        let sync = input.sync;
        if (sync === null || sync === undefined) {
            return false;
        }
        let weekDiff;
        if (weekNo < sync.weekNo) {
            weekDiff = sync.weekNo;
        }
        else {
            weekDiff = ((weekNo - sync.weekNo) + sync.weekDiff) % 3;
        }

        //could be object as normal or array when there are period 0s.
        let fetchedTimetable = input.tt['days'][(dayDiff + 5*weekDiff).toString()];
        if (Array.isArray(fetchedTimetable)) {
            let i = 0;
            while (i < fetchedTimetable.length) {
                output.timetable.timetable[i.toString()] = fetchedTimetable[i];
                i++;
            }
        }
        else {
            output.timetable.timetable = fetchedTimetable;
        }

        output.timetable.subjects = input.tt.subjects;

        let weekdays = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        let weeks = ["A", "B", "C"];

        output.dayName = (weekdays[dayDiff] + " " + weeks[weekDiff]);
        let dayOut = new Date(showDay);
        output.date = (
            dayOut.getFullYear().toString()
            + "-"
            + (dayOut.getMonth() + 1).toString()
            + "-"
            + dayOut.getDate().toString()
        );

        if (dayDiff === 1 || dayDiff === 2) {
            output.bells = [...bellRoutines.MonTue];
        }
        else if (dayDiff === 3 || dayDiff === 4) {
            output.bells = [...bellRoutines.WedThu];
        }
        else if (dayDiff === 5) {
            output.bells = [...bellRoutines.Fri];
        }
        else {
            console.log("Error when generating synthetic day timetable.");
        }

        // console.log(output);

        return output;

    }

    function loadStoredData() {
        let output = {
            timestamp: 0,
            dayName: "Loading ...",
            dataState: "",
            userId: "",
            dtt: {},
            tt: {},
            feeds: {},
            bells: [],
            sync: {}
        };

        let storedData = passItem('storedData');
        if (storedData !== null && storedData.hasOwnProperty("timestamp")) {
            if (Date.now() <= Number(storedData.timestamp)) {
                console.log("Stored data still valid");
                output = storedData;
            }
            else if (storedData.hasOwnProperty("tt") && storedData.tt.hasOwnProperty('subjects')) {
                let synth = synthDTT(storedData);
                if (synth) {
                    output = {...storedData, ...{dtt: synth, dayName: synth.dayName, feeds: {}, dataState: "loading"}};
                }
                else {
                    output = {...storedData, ...{dtt: {}, feeds: {}, dataState: "loading"}};
                }
            }
        }
        return output;
    }

    const [data, setData] = useState(loadStoredData);

    const [currentPageName, setCurrentPageName] = useState("bells");
    const [showLogin, setLogin] = useState(data.dataState === "askToLogin");

    React.useEffect(() => {
        async function dataManager() {
            let newData = {};
            let newDataInput = {};
            let doNothing;
            let getId = true;
            if (data.userId !== "") {
                getId = false;
            }
            //TODO: PREFLIGHT: getData (disable for testing)

            // await getData(getId)
            //     .then(res => newDataInput=res)
            //     .then(() => (newDataInput.hasOwnProperty("dataState") ? newData=newDataInput : doNothing=false))
            //     .catch((err) => console.log(err));

            let displayData = {...data, ...newData};

            let savedData = passItem('storedData');
            savedData = {...savedData, ...newData};
            saveItem('storedData', savedData);


            setData(displayData);
            setLogin((displayData.dataState === "askToLogin"));

        }
        if (passStr("usedApp") === null) {
            return null;
        }
        else {
            dataManager().catch((e) => console.log(e));
        }
    }, []);

    function showDataMessage(on, isBells=false) {
        if (passStr("usedApp") === null) {
            if (isBells) {
                setLogin(false);
            }
            else {
                setLogin(true);
            }
        }
        else if (data.dataState === "askToLogin" && on) {
            setLogin(true);
        }
        else if (on === false) {
            setLogin(false);
        }
        else {
            setLogin(false);
        }
    }

    function reportClicked(name) {
        if (name === "barcode") {
            setCurrentPageName("barcode");
            showDataMessage(false);
        }
        else if (name === "timetable") {
            setCurrentPageName("timetable");
            showDataMessage(false);
        }
        else if (name === "bells") {
            setCurrentPageName("bells");
            showDataMessage(true, true);
        }
        else if (name === "feeds") {
            setCurrentPageName("feeds");
            showDataMessage(true);
        }
        else if (name === "settings") {
            setCurrentPageName("settings");
            showDataMessage(false);
        }
    }

    let pageBells = (<PageBells dayName={data.dayName} data={data.dtt} defaultBells={data.bells} dataState={data.dataState} />);
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} sync={data.sync} />);
    let pageFeeds = (<PageFeeds data={data.feeds} dataState={data.dataState} />);
    let pageSettings = (<PageSettings />);

    let currentPage;
    if (passStr('usedApp') === null && currentPageName === 'bells') {
        currentPage = (<About />);
    }
    else if (currentPageName === 'bells') {
        currentPage = pageBells;
    }
    else if (currentPageName === 'barcode') {
        currentPage = pageBarcode;
    }
    else if (currentPageName === 'timetable') {
        currentPage = pageTimetable;
    }
    else if (currentPageName === 'feeds') {
        currentPage = pageFeeds;
    }
    else if (currentPageName === 'settings') {
        currentPage = pageSettings;
    }



    const output = (
        <div className="app-container">
            <div className="page">
                {currentPage}
                {showLogin ? <DataMessage /> : ""}
            </div>
            <Nav reportClicked={reportClicked} initialPage="bells" />
        </div>
    );

    return output;
}

export default App;
