import React from 'react';
import {saveItem} from "./version";


export default function About() {
    function redirect() {
        saveItem("usedApp", {yes: "yes"});
        window.location.assign("https://genericbells.pages.dev/");
    }

    const output = (
        <div className="about__container">
            <img className="about__icon" src="https://mintcarrotkeys.github.io/generic-bells/favicon3.svg" />
            <button className="about__button" onClick={redirect} >Login</button>
            <div className="about__description">
                <h3 className="settings about__description">Friendly & concise UI</h3>
                <h3 className="settings about__description">Colourful & customisable</h3>
                <h3 className="settings about__description">Works offline (soon)</h3>
            </div>
        </div>
    );

    return output;

};