import React from 'react';
import {saveItem, saveStr} from "./version";
import {requestCode} from "./apiFetcher";
import { ReactComponent as Logo } from "./assets/favicon3.svg";


export default function About() {
    function redirect() {
        console.log("Hi")
        saveStr("usedApp", "yes");
        requestCode();
    }

    const output = (
        <div className="about__container">
            {/*<img className="about__icon" src={logo}  alt="logo"/>*/}
            <div className="about__icon"><Logo /></div>
            <h1 className="about__title">Generic Bells</h1>
            <button className="about__button button" onClick={() => redirect()} >Login</button>
            <div className="about__description">
                {/*<h3 className="settings about__description">Friendly UI</h3>*/}
                {/*<h3 className="settings about__description">Colourful timetables</h3>*/}
                {/*<h3 className="settings about__description">Works offline (soon)</h3>*/}
            </div>
        </div>
    );

    return output;

};