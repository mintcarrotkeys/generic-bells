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
            userId: "000000000",
            dtt: {},
            tt: {},
            feeds: {},
            bells: [],
            sync: {}
        };

        let storedData = passItem('storedData');
        if (storedData !== null) {
            if (Date.now() <= Number(storedData.timestamp)) {
                output = storedData;
            }
            else if (storedData.tt.hasOwnProperty('subjects')) {
                output = {...storedData, ...{dtt: {}, feeds: {}}};
            }
        }
        return output;
    }

    const [data, setData] = useState(loadStoredData);

    let pageBells;
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} sync={data.sync} />);
    let pageFeeds = (<PageFeeds data={data.feeds} dataState={data.dataState} />);
    let pageSettings = (<PageSettings />);

    if (passStr('usedApp') === null) {
        pageBells = (<About />);
    }
    else {
        pageBells = (<PageBells dayName={data.dayName} data={data.dtt} defaultBells={data.bells} />);
    }

    const [currentPage, setCurrentPage] = useState(pageBells);

    React.useEffect(() => {
        async function dataManager() {
            let newData = {};
            await getData().then(res => newData = res).catch((err) => console.log(err));
            newData = ({...data, ...newData});

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

                const today = new Date();
                let showDay;
                let dayDiff;
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

                let weekNo = getWeekNum(showDay);
                let sync = newData.sync;
                let weekDiff = ((weekNo - sync.weekNo) + sync.weekDiff) % 3;

                //could be object as normal or array when there are period 0s.
                let fetchedTimetable = newData.tt.days[(dayDiff + 5*weekDiff).toString()];
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

                output.timetable.subjects = newData.tt.subjects;

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
                    console.log("dayDiff not in range 1-5 when generating synthetic day timetable.");
                }

                output.bells = [...output.bells];

                // console.log(output);

                return output;

            }

            if (newData.dtt.hasOwnProperty('timetable')===false && newData.tt.hasOwnProperty('subjects')) {
                const synth = synthDTT();
                if (synth) {
                    newData.dtt = synth;
                    newData.dayName = synth.dayName;
                }
                else {
                    console.log("Failed to generate day schedule from timetable.");
                }
            }
            saveItem('storedData', newData);
            setData(newData);
            setCurrentPage(<PageBells dayName={newData.dayName} data={newData.dtt} defaultBells={newData.bells} />);

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
        else if (passStr("useApp") === null) {
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
