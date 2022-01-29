import React, { useState, useEffect } from 'react';
import Period from "../components/Period";
import Break from "../components/Break";
import TopBar from "../components/TopBar"
import {apiDataHandler} from "../apiDataHandler";
import Offline from "../components/Offline";





export default function PageBells(props) {
    // console.log(props.data);

    if (Object.keys(props.data).length === 0) {
        return null;
    }
    //console.log(apiData);

    /**
     props:

     dayName = ""
     data = [{}]
         periodNumber
         time
         displayName
         colour {hex, isDark}
         room
         highlightRoom
         teacher

     **/

    let apiData;
    try {
        apiData = apiDataHandler(props.data);
    }
    catch {
        apiData = apiDataHandler({...props.data, ...{bells: props.defaultBells}});
    }

    let outputRows = [];
    let uniqueIdIterator = 0;
    for (const routineRow of apiData) {
        if (routineRow.displayAsClass === true) {
            outputRows.push(
                <Period
                    id={uniqueIdIterator}
                    key={uniqueIdIterator}
                    periodNumber={routineRow.periodNumber}
                    time={routineRow.time}
                    displayName={routineRow.displayName}
                    colour={routineRow.colour}
                    room={routineRow.room}
                    highlightRoom={routineRow.highlightRoom}
                    teacher={routineRow.teacher}
                />
            );
        }
        else {
            outputRows.push(
                <Break
                    id={uniqueIdIterator}
                    key={uniqueIdIterator}
                    time={routineRow.time}
                    displayName={routineRow.displayName}
                />
            );
        }
        uniqueIdIterator += 1;
    }

    return (
        <div className="page__bells page__prop">
            {props.isOffline ? <Offline /> : ""}
            <TopBar dayName={props.dayName} data={apiData} date={props.data.date} />
            {outputRows}
            <div className="barcodeFontLoader barcodeFontLoader-0">bc</div>
            <div className="barcodeFontLoader barcodeFontLoader-1">bl3</div>
            <div className="barcodeFontLoader barcodeFontLoader-2">bl4</div>
            <div className="barcodeFontLoader barcodeFontLoader-3">bl5</div>
        </div>
    );

}