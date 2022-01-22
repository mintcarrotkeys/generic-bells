import React, { useState } from "react";
import { icons } from '../assets/nav-icons';

export default function Nav(props) {
    /**
     props:

     reportClicked = reportClicked(name)

     **/
    // console.log(props);
    const initialState = {
        barcode: '',
        timetable: '',
        bells: '',
        feeds: '',
        settings: ''
    };

    const [buttonStates, setButtonStates] = useState({...initialState, ...{[props.initialPage]: ' nav__button--currentPage'}});

    function handleClick(name) {
        props.reportClicked(name);
        setButtonStates({...initialState, ...{[name]: ' nav__button--currentPage'}});
    }

    const output = (
        <div className="nav">
            <div className={"nav__button" + buttonStates.barcode} onClick={() => handleClick('barcode')}>
                {icons.barcode}
                <div className="nav__button__name">Barcode</div>
            </div>
            <div className={"nav__button" + buttonStates.timetable} onClick={() => handleClick('timetable')}>
                {icons.timetable}
                <div className="nav__button__name">Timetable</div>
            </div>
            <div className={"nav__button nav__button--center" + buttonStates.bells} onClick={() => handleClick('bells')}>
                {icons.bells}
            </div>
            <div className={"nav__button" + buttonStates.feeds} onClick={() => handleClick('feeds')}>
                {icons.feeds}
                <div className="nav__button__name">Notices</div>
            </div>
            <div className={"nav__button" + buttonStates.settings} onClick={() => handleClick('settings')}>
                {icons.settings}
                <div className="nav__button__name">Settings</div>
            </div>
        </div>
    );

    return output;
}