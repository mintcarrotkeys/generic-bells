import React, { useEffect, useState } from 'react';
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
    let checkDate = date.split("-");
    if (checkDate[0].length === 2) {
        checkDate[0] = "20" + checkDate[0];
    }
    if (checkDate[1].length === 1) {
        checkDate[1] = "0" + checkDate[1];
    }
    if (checkDate[2].length === 1) {
        checkDate[2] = "0" + checkDate[2];
    }
    date = checkDate.join("-");



    let rows = props.data;
    // console.log(date);
    // console.log(rows);
    // console.log(Date.now());

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
        // console.log(time);
        // console.log(date + "T" + rows[i].time + ":00");
        // console.log(rows[i].time);
        if (Date.now() < time) {
            break;
        }
        i ++;
    }
    let leftIcon = "";
    let rightIcon = "";
    let middleText = "";

    const dayName = (<div className="topBar__dateDisplay">{props.dayName}</div>);

    const [r, rerender] = useState(Date.now());
    let targetTime;
    if (i < rows.length) {
        targetTime = Date.parse(date + "T" + rows[i].time + ":00");
    }

    function tick() {
        rerender(Date.now());
    }

    useEffect(() => {
        let timer;
        if (i < rows.length) {
            timer = setTimeout(tick, (targetTime - Date.now() + 400));
        }

        return function cleanup() {
            clearTimeout(timer);
        }
    });



    if (Date.now() < Date.parse(date + "T00:00:00")) {
        console.log("s0");
        middleText = dayName;
    }
    else if (i === 0) {
        console.log("s1");
        middleText = <Clock targetTime={targetTime} />
        rightIcon = displayIcon(rows[i]);
    }
    else if (i < rows.length) {
        console.log("s2");
        leftIcon = displayIcon(rows[i-1]);
        middleText = <Clock targetTime={targetTime} />
        rightIcon = displayIcon(rows[i]);
    }
    else if (Date.now() < Date.parse(date + "T23:59:59")) {
        console.log("s3");
        leftIcon = displayIcon(rows[i-1]);
        middleText = dayName;

    }
    else {
        console.log("s4");
        middleText = dayName;
    }


    const output = (
        <div id="topBar" className="topBar period">
            <div className="topBar__side topBar__left">{leftIcon}</div>
            <div className="topBar__middle">{middleText}</div>
            <div className="topBar__side topBar__right">{rightIcon}</div>
        </div>
    );

    return output;
}

