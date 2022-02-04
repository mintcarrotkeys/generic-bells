import React, { useState } from 'react';
import ClassInfo from "../components/ClassInfo";
import {passStr, saveStr, passItem, saveItem} from "../version";
import { ReactComponent as Logo } from "../assets/favicon3.svg";


export default function PageSettings(props) {


    /**
     * rawName
     * displayName
     * colour: hex, isDark
     * displayCode
     *
     * **/
    let classSettings = passItem('displaySettings');
    let classInfos = [];

    function reportInput(id, type, val) {
        classSettings[id][type] = val;
        saveItem("displaySettings", classSettings);
    }

    if (classSettings !== null) {
        let i = 0;
        for (const subject in classSettings) {
            // console.log(subject);
            classInfos.push(
                <ClassInfo reportInput={reportInput} obj={classSettings[subject]} key={i.toString()} id={i.toString()} />
            );
            i++;
        }
    }

    function clearData(e) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    function logoutData(e) {
        localStorage.removeItem('access_timestamp');
        localStorage.removeItem('handle_access');
        localStorage.removeItem('refresh_timestamp');
        localStorage.removeItem('handle_refresh');
        localStorage.removeItem('usedApp');
        localStorage.removeItem('storedData');
        sessionStorage.clear();
        window.location.reload();
    }

    const [cardsExpanded, setCardsExpanded] = useState(passStr('set_cards_expanded')==="yes");
    const [feedsExpanded, setFeedsExpanded] = useState(passStr('set_feeds_expanded')==='yes');
    const [timetableWeekOrder, setTimetableWeekOrder] = useState(passStr('set_tt_week_order')==='yes');

    function handleCardsToggle(side) {
        if (!side) {
            saveStr('set_cards_expanded', '');
            setCardsExpanded(side);
        }
        else {
            saveStr('set_cards_expanded', 'yes');
            setCardsExpanded(side);
        }

        return true;
    }

    function handleFeedsToggle(side) {
        if (!side) {
            saveStr('set_feeds_expanded', '');
            setFeedsExpanded(false);
        }
        else {
            saveStr('set_feeds_expanded', 'yes');
            setFeedsExpanded(true);
        }
    }

    function handleTimetableWeekOrderToggle(side) {
        if (!side) {
            saveStr('set_tt_week_order', '');
            setTimetableWeekOrder(false);
        }
        else {
            saveStr('set_tt_week_order', 'yes');
            setTimetableWeekOrder(true);
        }
    }

    function chooseFeedYear(e) {
        if (e.target.value === "all") {
            saveItem({seeOnlyMyYear: false, year: ""});
        }
        else {
            saveItem("feedSettings", {seeOnlyMyYear: true, year: e.target.value});
        }
    }
    const feedSettings = passItem('feedSettings');
    let savedFeedYear = "all";
    if (feedSettings !== null) {
        savedFeedYear = (feedSettings.seeOnlyMyYear ? feedSettings.year : "all");
    }

    const output = (
        <div className="page__settings page__prop">
            <h1 className="bigHeading">Settings</h1>
            <div className="group" id="banner">
                <Logo style={{width: '100px'}} />
            </div>
            <div className="group">
                <h2 className="settings">Customise colours & names</h2>
                <p className="settings">
                    Choose a colour for each subject. Long names are used on the daily
                    timetable. Short names are used on the full timetable (max. 6 characters).
                </p>
                {classInfos}
            </div>
            <div className="group">
                <h2 className="settings">Period display style</h2>
                <p className="settings">
                    Click on the cards for each period to show details like teacher name & time.
                    The button below sets them to be expanded by default.
                </p>
                <div className="toggle">
                    <div className={"toggle__left toggle__side" + (!cardsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleCardsToggle(false)}>
                        collapse all
                    </div>
                    <div className={"toggle__right toggle__side" + (cardsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleCardsToggle(true)}>
                        expand all
                    </div>
                </div>
                <div className={"period page__bells__row " + (cardsExpanded ? "period--maximised" : "period--minimised")} onClick={() => handleCardsToggle(!cardsExpanded)}>
                    <div className="period__top">
                        <div className="period__icon" style={{
                            backgroundColor: '#d0d0d0',
                            color: ('black')
                        }}>
                            1
                        </div>
                        <div className="period__name">
                            Click Me
                        </div>
                        <div className= {"period__room"}>
                            000
                        </div>
                    </div>
                    <div className={"period__details " + (cardsExpanded ? "period__details--expanded" : "period__details--closed")}>
                        <div className="period__details__item">time</div>
                        <div className="period__details__item">teacher</div>
                    </div>
                </div>
            </div>
            <div className="group">
                <h2 className="settings">Notices display style</h2>
                <p className="settings">Click on each notice to expand and show the full text.</p>
                <div className="toggle">
                    <div className={"toggle__left toggle__side" + (!feedsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleFeedsToggle(false)}>
                        collapse all
                    </div>
                    <div className={"toggle__right toggle__side" + (feedsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleFeedsToggle(true)}>
                        expand all
                    </div>
                </div>
                <div
                    className="feedItem"
                    onClick={() => handleFeedsToggle(!feedsExpanded)}
                >
                    <h2 className="feedItem__title">Click me</h2>
                    <div className="feedItem__metadataRow settings" >
                        <div className="feedItem__meetingTag" style={{backgroundColor: '#d0d0d0'}}>
                            <div className="feedItem__metadata feedItem__metadata__meeting">Meeting: </div>
                            <b className="feedItem__metadata feedItem__metadata__meeting settings">Time</b>
                            <b className="feedItem__metadata feedItem__metadata__meeting settings">Location</b>
                        </div>
                        <b className="feedItem__metadata">Teacher</b>
                        <div className="feedItem__metadata">Student years</div>
                    </div>
                    <p
                        className={"settings feedItem__body " + (feedsExpanded ? "feedItem__body--expanded" : "feedItem__body--minimised")}
                    >
                        Click to expand and see the full message. <br /> This is the main body of the message <br />
                        Click again to minimise the message.
                    </p>
                </div>
                <div className="dropdown">
                    <h3 className="dropdown__label settings" style={{fontWeight: 500}}>Only show notices for year: </h3>
                    <select name="yearsList" id="yearsList" onChange={chooseFeedYear} defaultValue={savedFeedYear} className="dropdown__selector">
                        <option value="all">all</option>
                        <option value="7" >7</option>
                        <option value="8" >8</option>
                        <option value="9" >9</option>
                        <option value="10" >10</option>
                        <option value="11" >11</option>
                        <option value="12" >12</option>
                    </select>
                </div>
            </div>
            <div className="group">
                <h2 className="settings">Timetable display style</h2>
                <h4 className="settings">Order weeks are shown in:</h4>
                <div className="toggle">
                    <div className={"toggle__left toggle__side" + (!timetableWeekOrder ? " toggle--selected" : "")}
                         onClick={() => handleTimetableWeekOrderToggle(false)}>
                        static ABC
                    </div>
                    <div className={"toggle__right toggle__side" + (timetableWeekOrder ? " toggle--selected" : "")}
                         onClick={() => handleTimetableWeekOrderToggle(true)}>
                        current week first
                    </div>
                </div>
                <p className="settings">
                    <b>static: </b>Weeks are always shown in A-B-C order from top to bottom.
                    <br />
                    <b>current week first: </b>
                    The current week is shown at the top, then the next week, then the week after.
                </p>
            </div>
            <div className="group">
                <h2 className="settings">Help</h2>

                <h4 className="settings">Show teacher name for periods</h4>
                <p className="settings">Click on each period on the main page to see details.</p>

                <h4 className="settings">Install/Add this app to your home screen</h4>
                <p className="settings">
                    iOS: Safari > share (arrow-up icon on the right of the url bar) > Add to home screen
                </p>
                <p className="settings">
                    Android: Chrome > menu (3-dots icon on the right of url bar) > Install
                </p>
                <p className="settings">
                    Windows: Edge > Install (blocks icon inside the url bar on the right end)
                </p>

                <h4 className="settings">Update to the newest version</h4>
                <p className="settings">
                    1. Open GenericBells and reload the page.<br />
                    2. Close the app and any browser tabs containing the app.<br />
                    3. Open the app again and check version number in settings page.
                </p>

                <h4 className="settings">Site not working?</h4>
                <p className="settings">Close all browser tabs and try again.</p>
                <p className="settings">
                    Try removing "site data" for this site in your browser settings.
                    This may be listed under various names like privacy, cookies, manage browsing data etc.
                    Look up your browser to see how to do this.
                </p>
                <h4 className="settings">Contact</h4>
                <p className="settings">
                    Google forms: <a href="https://forms.gle/me4tVTEv1ect7Lhn9">https://forms.gle/me4tVTEv1ect7Lhn9</a>
                </p>
            </div>

            <div className="group">
                <h2 className="settings">About Generic Bells</h2>
                {/* TODO: PREFLIGHT: version number */}
                <h4 className="settings">version 1.4.6</h4>
                <p className="settings">A colourful, customisable & concise web app to show your SBHS timetable data.</p>
                <p className="settings">Source code can be found on Github here.</p>
                <p className="settings"><a
                    href="https://github.com/mintcarrotkeys/generic-bells">mintcarrotkeys/generic-bells</a></p>
                <p className="settings"><br/></p>
                <p className="settings">
                    This is a beta release, meaning the software will have bugs and unforeseen problems.
                    Use at your own risk. Don't enter any private or irrecoverable data into the app.
                    Your school API data is stored locally on your device for security and compliance.
                </p>
            </div>
            <div className="group">
                <button className="settings button" onClick={logoutData}>Logout</button>
                <p className="settings" style={{"marginTop": "0px"}}>
                    This will delete the timetable data & any tokens stored on your device. <br />
                    <span style={{fontWeight: 500}}>
                        Note: Your settings, including the names of your classes and teachers, will NOT be deleted.
                    </span>
                </p>
                <button className="settings button" onClick={clearData}>Clear data</button>
                <p className="settings" style={{"marginTop": "0px"}}>
                    This will clear all user data that we store on your computer. <br />
                    <span style={{fontWeight: 500}}>Note: Your settings will be deleted.</span>
                </p>
            </div>
            <div className="group">
                <h2 className="settings">License</h2>
                <p className="settings no_fold">
                    <br />
                    Code is released with the MIT license.
                    <br /><br />
                    Copyright (c) 2022 mintcarrotkeys
                    <br /><br />
                    Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                    <br /><br />
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                    <br /><br />
                    <b>
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                    SOFTWARE.
                    </b>
                    <br /><br />
                    src/assets/code128TranslationData.js was based on data from Wikipedia:
                    https://en.wikipedia.org/wiki/Code_128
                    under the CC-BY-SA license. The file is shared under the same license:
                    https://creativecommons.org/licenses/by-sa/3.0/
                    <br /><br />
                    src/assets/nav-icons.js contains icons obtained from Bootstrap under the MIT license.
                    Copyright (c) 2019-2021 The Bootstrap Authors for those icons.
                    <br /><br />
                    See source code on Github for more details. (link above)
                    <br /><br />
                    <b>
                        The Generic Bells logo, which is used within the app and as a favicon, is:<br />
                        Copyright (c) 2022 mintcarrotkeys All rights reserved.
                    </b>
                    <br />
                </p>
            </div>
            <div className="group">
                <h1 className="settings">Sample text</h1>
                <h2 className="settings">Heading 2</h2>
                <h3 className="settings">Heading 3</h3>
                <h4 className="settings">Heading 4</h4>
                <h5 className="settings">Heading 5</h5>
                <h6 className="settings">Heading 6</h6>
                <p className="settings">Body text</p>

            </div>
        </div>
    );



    return output;
}