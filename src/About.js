import React from 'react';
import {saveItem, saveStr} from "./version";
import {requestCode} from "./apiFetcher";
import { ReactComponent as Logo } from "./assets/favicon3.svg";


export default function About() {
    function redirect() {
        saveStr("usedApp", "yes");
        requestCode();
    }

    const output = (
        <div className="about__container">
            <div className="about__icon"><Logo /></div>
            <h1 className="bigHeading about__title">Generic Bells</h1>
            <button className="about__button button" onClick={() => redirect()} >Login</button>
            <div className="about__description">
            </div>
        </div>
    );

    return output;

};