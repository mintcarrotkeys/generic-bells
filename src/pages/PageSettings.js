import React, { useState } from 'react';
import ClassInfo from "../components/ClassInfo";
import {passStr, saveStr, passItem, saveItem} from "../version";
import DemoPeriod from "../components/DemoPeriod";
import Period from "../components/Period";


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

    let i = 0;
    for (const subject in classSettings) {
        // console.log(subject);
        classInfos.push(
            <ClassInfo reportInput={reportInput} obj={classSettings[subject]} key={i.toString()} id={i.toString()} />
        );
        i ++;
    }

    function logout(e) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.assign("https://mintcarrotkeys.github.io/generic-bells/about");
    }

    const [cardsExpanded, setCardsExpanded] = useState(passStr('set_expanded'));

    function handleExpand() {
        if (cardsExpanded==='yes') {
            saveStr('set_expanded', 'no');
        }
        else {
            saveStr('set_expanded', 'yes');
        }
        let x = (cardsExpanded==='yes' ? 'no' : 'yes');
        setCardsExpanded(x);

        return true;
    }

    // const demoPeriodDisplay = (
    // );

    const output = (
        <div className="page__settings">
            <h1>Settings</h1>
            <div className="group" id="banner">
                <img className="banner__image" width="100px" src='https://mintcarrotkeys.github.io/generic-bells/favicon3.svg' alt="Generic Bells logo" />
            </div>
            {/*<div className="group">*/}
            {/*    <h5 className="settings">Save this app to your home screen</h5>*/}
            {/*    <h6 className="settings">Chrome android</h6>*/}
            {/*    <p className="settings">Click the menu button > Add to Home screen </p>*/}
            {/*    <h6 className="settings">Firefox </h6>*/}
            {/*    <p className="settings">Click the menu button > Install </p>*/}
            {/*    <h6 className="settings">Safari</h6>*/}
            {/*    <p className="settings">Click the share button > Add to Home Screen </p>*/}

            {/*</div>*/}
            <div className="group">
                <h2 className="settings">Change colours & names</h2>
                <p className="settings">
                    Choose a colour for each subject. Long names are used on the daily
                    timetable. Short names are used on the full timetable (max. 4 letters).
                </p>
                {classInfos}
            </div>
            <div className="group">
                <h2 className="settings">Period display</h2>
                <p className="settings">
                    Click on the cards for each period to show details like teacher name & time.
                    The button below sets them to be expanded by default.
                </p>
                <button className="settings button" onClick={handleExpand}>
                    {(cardsExpanded==='yes' ? "collapse all" : "expand all")}
                </button>
                <div className={"period page__bells__row " + (cardsExpanded==='yes' ? "period--maximised" : "period--minimised")} onClick={handleExpand}>
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
                    <div className={"period__details " + (cardsExpanded==='yes' ? "period__details--expanded" : "period__details--closed")}>
                        <div className="period__details__item">time</div>
                        <div className="period__details__item">teacher</div>
                    </div>
                </div>
            </div>
            <div className="group">
                <button className="settings button" onClick={logout}>Logout</button>
                <p className="settings" style={{"marginTop": "0px"}}>
                    This will clear all user data that we store on your computer. <br />
                    <span style={{fontWeight: 500}}>Note: Your settings will be deleted.</span>
                </p>
            </div>
            <div className="group">
                <h2 className="settings">Help</h2>
                <h6 className="settings">Show teacher name & classes</h6>
                <p className="settings">Click on each period on the home page to see details.</p>
                {/*<h6 className="settings">Why do we have to login to school SSO every hour?</h6>*/}
                {/*<p className="settings">*/}
                {/*    At the moment, this app does not store refresh tokens (lasts 90 days) for the sake of data security.*/}
                {/*    The access token is stored in your browser, and unfortunately only lasts 1 hour.*/}
                {/*    This problem may be remedied in the future.*/}
                {/*    The app should automatically redirect you to login if it needs a new token.*/}
                {/*</p>*/}
            </div>
            <div className="group">
                <h2 className="settings">About Generic Bells</h2>
                <p className="settings">This app aims to show your timetable in a concise, friendly and reliable way.</p>
                <p className="settings">Source code can be found on Github here.</p>
                <p className="settings"><a href="https://github.com/mintcarrotkeys/generic-bells">github.com/mintcarrotkeys/generic-bells</a></p>

            </div>

        </div>
    );



    return output;
}