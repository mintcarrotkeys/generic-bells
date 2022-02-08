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
                output = {...storedData, ...{dtt: {}, feeds: {}, dataState: "askToLogin"}};
            }
        }
        return output;
    }

    const [data, setData] = useState(loadStoredData);

    let pageBells;
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} sync={data.sync} />);
    let pageFeeds = (<PageFeeds data={data.feeds} isOffline={(data.dataState==="offline")} />);
    let pageSettings = (<PageSettings />);

    if (passStr('usedApp') === null) {
        pageBells = (<About />);
    }
    else {
        pageBells = (
            <PageBells
                dayName={data.dayName}
                data={data.dtt}
                defaultBells={data.bells}
                isOffline={(data.dataState==="offline")}
            />);
    }

    const [currentPage, setCurrentPage] = useState(pageBells);

    React.useEffect(() => {
        async function dataManager() {
            let newData = {};
            let newDataInput = {};
            let doNothing;
            let getId = true;
            if (data.userId !== "") {
                getId = false;
            }
            //TODO: PREFLIGHT: getData

            await getData(getId)
                .then(res => newDataInput=res)
                .then(() => (newDataInput.hasOwnProperty("dataState") ? newData=newDataInput : doNothing=false))
                .catch((err) => console.log(err));
            // console.log(data);
            // console.log(newData);
            // console.log(newDataInput);

            function synthDTT() {
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
                let sync = displayData.sync;
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
                let fetchedTimetable = displayData.tt['days'][(dayDiff + 5*weekDiff).toString()];
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

                output.timetable.subjects = displayData.tt.subjects;

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

            let displayData = {...data, ...newData};

            let savedData = passItem('storedData');
            savedData = {...savedData, ...newData};
            saveItem('storedData', savedData);

            if (displayData.dtt.hasOwnProperty('timetable')===false && displayData.tt.hasOwnProperty('subjects')) {
                const synth = synthDTT();
                if (synth) {
                    displayData.dtt = synth;
                    displayData.dayName = synth.dayName;
                }
                else {
                    console.log("Failed to generate day schedule from timetable.");
                }
            }

            setData(displayData);

            setCurrentPage(
                <PageBells
                    dayName={displayData.dayName}
                    data={displayData.dtt}
                    defaultBells={displayData.bells}
                    isOffline={(displayData.dataState==="offline")}
                />);

        }
        if (passStr("usedApp") === null) {
            return null;
        }
        else {
            dataManager().catch((e) => console.log(e));
        }
    }, []);

    const [showLogin, setLogin] = useState(data.dataState === "askToLogin");

    function showDataMessage(off) {
        if (data.dataState === "askToLogin") {
            setLogin(true);
        }
        else if (data.dataState === "success") {
            setLogin(false);
        }
        else if (off) {
            setLogin(false);
        }
        else if (passStr("usedApp") === null) {
            setLogin(true);
        }
        else {
            setLogin(false);
        }
    }

    function reportClicked(name) {
        if (name === "barcode") {
            setCurrentPage(pageBarcode);
            showDataMessage();
        }
        else if (name === "timetable") {
            setCurrentPage(pageTimetable);
            showDataMessage();
        }
        else if (name === "bells") {
            setCurrentPage(pageBells);
            showDataMessage(true);
        }
        else if (name === "feeds") {
            setCurrentPage(pageFeeds);
            showDataMessage();
        }
        else if (name === "settings") {
            setCurrentPage(pageSettings);
            showDataMessage(true);
        }
    }


    const output = (
        <div className="app-container">
            <div className="page">
                {showLogin ? <DataMessage /> : ""}
                {currentPage}
            </div>
            <Nav reportClicked={reportClicked} initialPage="bells" />
        </div>
    );

    return output;
}

export default App;
