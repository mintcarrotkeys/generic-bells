import React, { useState } from "react";
import { passItem, saveItem } from '../version';

export default function Period(props) {
    /**
     props:

     periodNumber
     time
     displayName
     colour {hex, isDark}
     room
     highlightRoom
     teacher
     TODO: add a full name option to expanded card and truncate main title

     **/

    const [expanded, setExpand] = useState((passItem('set__expanded') === 'yes'));

    function handleClick(e) {
        setExpand(!expanded);
    }

    const iconStyle = {
        backgroundColor: props.colour.hex,
        color: (props.colour.isDark ? 'white' : 'black')
    }

    const roomClass = "period__room" + (props.highlightRoom ? " period__room--highlight" : "");

    const classTags = "period page__bells__row " + (expanded ? "period--maximised" : "period--minimised");

    const details = (
        <div className={"period__details " + (expanded ? "period__details--expanded" : "period__details--closed")}>
            <div className="period__details__item">{props.time}</div>
            <div className="period__details__item">{props.teacher}</div>
        </div>
    );

    const showClass = (
        <div className={classTags} onClick={handleClick}>
            <div className="period__top">
                <div className="period__icon" style={iconStyle}>
                    {props.periodNumber}
                </div>
                <div className="period__name">
                    {props.displayName}
                </div>
                <div className= {roomClass}>
                    {props.room}
                </div>
            </div>
            {details}
        </div>
    );

    //TODO: add expanded display

    return showClass;
}

