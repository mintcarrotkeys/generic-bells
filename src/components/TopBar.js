import React, { useEffect, useState } from 'react';
import Clock from "./Clock";



export default function TopBar(props) {

    function displayIcon(row, side='l') {
        if (row.displayAsClass) {
            const iconStyle = {
                backgroundColor: row.colour.hex,
                color: (row.colour.isDark ? 'white' : 'black')
            }
            const output = (
                <div className={"period__icon " + (side === 'r' ? "topBar__right__icon" : "")} style={iconStyle}>
                    {row.periodNumber}
                </div>
            );
            return output;
        }
        else {
            const output = (
                <div className={(side === 'r' ? "topBar__right__icon" : "")}>
                    {row.displayName}
                </div>
            );
            return output;
        }
    }

    let date = props.date.split("-");
    if (date[0].length === 2) {
        date[0] = "20" + date[0];
    }
    if (date[1].length === 1) {
        date[1] = "0" + date[1];
    }
    if (date[2].length === 1) {
        date[2] = "0" + date[2];
    }



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
    let targetTime;
    // console.log(rows);
    while (i < rows.length) {
        if (rows[i].time === "" || rows[i].time.indexOf(':') === -1) {
            rows.splice(i, 1);
            continue;
        }
        let timemark = rows[i].time.split(":");

        let timestamp = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(timemark[0]), Number(timemark[1]), 0);

        targetTime = timestamp.getTime();
        // time = Date.parse(date + "T" + rows[i].time + ":00");
        // console.log(time);
        // console.log(date + "T" + rows[i].time + ":00");
        // console.log(rows[i].time);
        // console.log(targetTime)
        if (Date.now() < targetTime) {
            break;
        }
        i += 1;
    }
    let leftIcon = "";
    let rightIcon = "";
    let middleText = "";

    const dayName = (<div className="topBar__dateDisplay">{props.dayName}</div>);

    const [r, rerender] = useState(Date.now());

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



    if (Date.now() < (new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), 0, 0, 0)).getTime()) {
        console.log("s0");
        middleText = dayName;
    }
    else if (i === 0) {
        console.log("s1");
        middleText = <Clock targetTime={targetTime} />
        rightIcon = displayIcon(rows[i], 'r');
    }
    else if (i < rows.length) {
        console.log("s2");
        leftIcon = displayIcon(rows[i-1]);
        middleText = <Clock targetTime={targetTime} />
        rightIcon = displayIcon(rows[i], 'r');
    }
    else if (Date.now() < (new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), 23, 59, 59)).getTime()) {
        console.log("s3");
        leftIcon = displayIcon(rows[i-1]);
        middleText = dayName;

    }
    else {
        console.log("s4");
        middleText = dayName;
    }

    let hint = "";
    if (rightIcon !== "") {
        hint = <div className="topBar__until"> until </div>;
    }

    const output = (
        <div id="topBar" className="topBar period">
            <div className="topBar__side topBar__left">{leftIcon}</div>
            <div className="topBar__middle">{middleText}</div>
            <div className="topBar__side topBar__right">{hint}{rightIcon}</div>
        </div>
    );

    return output;
}

