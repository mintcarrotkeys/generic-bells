import React, { useState } from "react";

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
    const iconStyle = {
        backgroundColor: props.colourData.hex,
        color: (props.colourData.isDark ? 'white' : 'black')
    }

    const roomClass = "period__room" + (props.highlightRoom ? " period__room--highlight" : "");

    const showClass = (
        <div className="period period--minimised page__bells__row">
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
    );

    //TODO: add expanded display

    return showClass;
}

