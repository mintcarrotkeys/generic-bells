import React, { useState } from 'react';
import Clock from "./Clock";



export default function TopBar(props) {

    function displayIcon(row) {
        if (row.displayAsClass) {
            const iconStyle = {
                backgroundColor: row.colour.hex,
                color: (row.colour.isDark ? 'white' : 'black')
            }
            const output = (
                <div className="period__icon" style={iconStyle}>
                    {row.periodNumber}
                </div>
            );
            return output;
        }
        else {
            const output = (
                <div className="break__name">
                    {row.displayName}
                </div>
            );
            return output;
        }
    }

    let date = props.date;
    let rows = props.data;
    let timestamp = Date.parse(date + "T23:59:59").toString();

    /**
     props:

     displayAsClass
     periodNumber
     time
     displayName
     colour {hex, isDark}
     room
     highlightRoom
     teacher

     **/
    let i = 0;
    let time;
    while (i < rows.length) {
        if (rows[i].time === "" || rows[i].time.indexOf(':') === -1) {
            rows.splice(i, 1);
            continue;
        }
        time = Date.parse(date + "T" + rows[i].time + ":00");
        if (Date.now() < time) {
            break;
        }
        i ++;
    }
    let leftIcon = "";
    let rightIcon = "";
    let middleText = "";

    const dayName = (<div className="topBar__dateDisplay">{props.dayName}</div>);

    if (Date.now() < Date.parse(date + "T00:00:00")) {
        console.log("Far into the future");
        middleText = dayName;
    }
    else if (i === 0) {
        let timer = Math.floor((Date.parse(date + "T" + rows[i].time + ":00") - Date.now()) / 1000);
        middleText = <Clock sec={timer} />
        rightIcon = displayIcon(rows[i]);
    }
    else if (i < rows.length) {
        leftIcon = displayIcon(rows[i-1]);
        let timer = Math.floor((Date.parse(date + "T" + rows[i].time + ":00") - Date.now()) / 1000);
        middleText = <Clock sec={timer} />
        rightIcon = displayIcon(rows[i]);
    }
    else if (Date.now() < Date.parse(date + "T23:59:59")) {
        leftIcon = displayIcon(rows[i-1]);
        middleText = dayName;

    }
    else {
        middleText = dayName;
    }


    const output = (
        <div className="topBar period">
            <div className="topBar__sideIcons">{leftIcon}</div>
            <div className="middleText">{middleText}</div>
            <div className="topBar__sideIcons">{rightIcon}</div>
        </div>
    );

    return output;
}

