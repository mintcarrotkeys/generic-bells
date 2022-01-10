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

    let data = props.data;
    let dataState = props.dataState;

    let pageBells = (<PageBells dayName={data.dayName} data={apiDataHandler(data.dtt)} />);
    let pageBarcode = (<PageBarcode userIdCode={data.userId} />);
    let pageTimetable = (<PageTimetable data={data.tt} />);
    let pageFeeds = (<PageFeeds />);
    let pageSettings = (<PageSettings />);

    const [currentPage, setCurrentPage] = useState(pageBells);

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
                {dataState === "askToLogin" ? <DataMessage /> : ""}
                {currentPage}
            </div>
            <Nav reportClicked={reportClicked} initialPage="bells" />
        </div>
    );

    return output;
}

export default App;
