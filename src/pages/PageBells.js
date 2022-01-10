import React, { useState } from 'react';
import Period from "../components/Period";
import Break from "../components/Break";
import TopBar from "../components/TopBar"





export default function PageBells(props) {

    if (Object.keys(props.data) == false) {
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

    let outputRows = [];
    let uniqueIdIterator = 0;
    for (const routineRow of props.data) {
        if (routineRow.displayAsClass === true) {
            outputRows.push(
                <Period
                    id={uniqueIdIterator}
                    key={uniqueIdIterator}
                    periodNumber={routineRow.periodNumber}
                    time={routineRow.time}
                    displayName={routineRow.displayName}
                    colourData={routineRow.colour}
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
        <div className="page__bells">
            <TopBar dayName={props.dayName} data={props.data} />
            {outputRows}
        </div>
    );

}