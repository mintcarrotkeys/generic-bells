import React from 'react';
import { noteIcon } from "../assets/nav-icons";
import {requestCode} from "../apiFetcher";
import {saveStr} from "../version";


export default function DataMessage(props) {

    function handleClick() {
        saveStr('usedApp', "yes");
        requestCode();
    }

    const output = (
        <div className="askLogin">
            <div className="askLogin__button button" id="redirect_to_login" onClick={handleClick}>
                {noteIcon}
                <div>
                    Login to view the latest data.
                </div>
            </div>
        </div>
    );

    return output;
}

