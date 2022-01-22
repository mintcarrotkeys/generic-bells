import React, { useState, useEffect } from 'react';
import PageBells from "./pages/PageBells";
import Nav from "./components/Nav";
import PageBarcode from "./pages/PageBarcode";
import PageTimetable from "./pages/PageTimetable";
import PageFeeds from "./pages/PageFeeds";
import PageSettings from "./pages/PageSettings";
import DataMessage from "./components/DataMessage";
import {passItem, saveItem} from "./version";
import {getData, getWeekNum} from "./apiFetcher";
import {bellRoutines} from "./assets/defaultBells";


function App() {


    function loadStoredData() {
        let output = {
            timestamp: 0,
            dayName: "Loading ...",
            dataState: "",
            userId: "000000000",
            dtt: {},
            tt: {},
            bells: [],
            sync: {}
        };

        let storedData = passItem('storedData');
        if (storedData !== null) {
            if (Date.now() <= Number(storedData.timestamp)) {
                output = storedData;
            }
            else if (storedData.tt.hasOwnProperty('subjects')) {
                output = {...storedData, ...{dtt: {}}};
            }
        }
        return output;
    }

    const [data, setData] = useState(loadStoredData);

    let pageBells = (<PageBells dayName={data.dayName} data={data.dtt} defaultBells={data.bells} />);
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} sync={data.sync} />);
    let pageFeeds = (<PageFeeds />);
    let pageSettings = (<PageSettings />);

    const [currentPage, setCurrentPage] = useState(pageBells);

    React.useEffect(() => {
        async function dataManager() {
            try {
                let newData = {};
                try {
                    newData = await getData();
                }
                catch(err) {
                    console.error(err);
                }
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

                const synth = synthDTT();
                if (newData.dtt.hasOwnProperty('timetable')===false && newData.tt.hasOwnProperty('subjects')) {
                    if (synth) {
                        newData.dtt = synth;
                        newData.dayName = synth.dayName;
                    }
                    else {
                        console.log("Failed to generate day schedule from timetable.");
                    }
                }
                saveItem('storedData', data);
                setData(newData);
                setCurrentPage(<PageBells dayName={newData.dayName} data={newData.dtt} defaultBells={newData.bells} />);
            }
            catch (err) {
                console.error(err);
            }
        }
        dataManager();
    }, []);

    function reportClicked(name) {
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
                {data.dataState === "askToLogin" ? <DataMessage /> : ""}
                {currentPage}
            </div>
            <Nav reportClicked={reportClicked} initialPage="bells" />
        </div>
    );

    return output;
}

export default App;
