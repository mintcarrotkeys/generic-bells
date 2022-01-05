import React, {useState} from 'react';
import PageBells from "./pages/PageBells";
import Nav from "./components/Nav";
import PageBarcode from "./pages/PageBarcode";
import PageTimetable from "./pages/PageTimetable";
import PageFeeds from "./pages/PageFeeds";
import PageSettings from "./pages/PageSettings";



function App(props) {

    let pageBells = (<PageBells routineData={props.routineData} />);
    let pageBarcode = (<PageBarcode userIdCode={"401235678"} />);
    let pageTimetable = (<PageTimetable />);
    let pageFeeds = (<PageFeeds />);
    let pageSettings = (<PageSettings />);

    const [currentPage, setCurrentPage] = useState(pageBells);
    const [currentPageId, setCurrentPageId] = useState('bells');

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
                {currentPage}
            </div>
            <Nav reportClicked={reportClicked} initialPage={currentPageId} />
        </div>
    );

    return output;
}

export default App;
