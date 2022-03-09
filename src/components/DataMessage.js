import React, {useState} from 'react';
import { askLogin } from "../assets/nav-icons";
import {requestCode} from "../apiFetcher";
import {saveStr} from "../version";


export default function DataMessage(props) {

    const [mode, setMode] = useState("askToLogin");

    function handleClick() {
        saveStr('usedApp', "yes");

        setMode("loading");
        requestCode();
    }

    const output = (
        <div className="askLogin">
            <div className="askLogin__button button" id="redirect_to_login" onClick={handleClick}>
                {askLogin.note}
                <div>
                    Login to view the latest data.
                </div>
            </div>
        </div>
    );

    const loading = (
        <div className="askLogin">
            <div className="askLogin__button button" id="redirect_to_login" style={{backgroundColor: "white", color: "#333333"}} onClick={handleClick}>
                {askLogin.loading}
                <div>
                    Loading the login page ...
                </div>
            </div>
        </div>
    );

    return (mode==="askToLogin" ? output : loading);
}

