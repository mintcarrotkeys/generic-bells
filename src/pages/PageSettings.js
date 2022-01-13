import React, { useState } from 'react';
import ClassInfo from "../components/ClassInfo";
import {Version, checkVersion, passItem, saveItem} from "../version";


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
        window.location.assign()
    }

    const output = (
        <div className="page__settings">
            <h1>Settings</h1>
            <div className="group">
                <h2 className="settings">Change colours & names</h2>
                <p className="settings">
                    Choose a colour for each subject. Long names are used on the daily
                    timetable. Short names are used on the full timetable (max. 4 letters).
                </p>
                {classInfos}
            </div>
            <div className="group">
                <button className="settings button" onClick={logout}>Logout</button>
                <p className="settings" style={{"marginTop": "0px"}}>
                    This will clear all user data that we store on your computer. <br />
                    <span style={{fontWeight: 500}}>Note: Your settings will be deleted.</span>
                </p>
            </div>
            <div className="group">
                <h2 className="settings">About Generic Bells</h2>
                <p className="settings">This app aims to show your timetable in a concise, friendly and reliable way.</p>
                <p className="settings">Source code can be found on Github here.</p>
                <p className="settings"><a href="https://github.com/mintcarrotkeys/generic-bells">github.com/mintcarrotkeys/generic-bells</a></p>

            </div>
            <div className="group" id="banner">
                <img className="banner__image" width="100px" src='https://mintcarrotkeys.github.io/generic-bells/favicon3.svg' alt="Generic Bells logo" />
            </div>

        </div>
    );



    return output;
}