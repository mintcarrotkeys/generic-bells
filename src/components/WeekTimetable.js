import React, { useEffect, useState } from 'react';
import {passItem} from "../version";
import CellTimetable from "./CellTimetable";
import TimetableIndex from "./TimetableIndex";



export default function WeekTimetable(props) {

    /**
     * weekName - A/B/C
     *
     * today - 0-5 0=none 1=Mon, 2=Tue etc.
     *
     * data = [];
     *
     * **/

    const classSettings = passItem('displaySettings');

    let ttGrid = [];
    let dayId = ['a', 'b', 'c', 'd', 'e'];
    let dayNames = ['mon', 'tue', 'wed', 'thu', 'fri'];

    ttGrid.push(
        <div className="tt__indexCol" id={"ttColIndex"} key={"ttColIndex"}>
            <TimetableIndex number={0} key={0} />
            <TimetableIndex number={1} key={1} />
            <TimetableIndex number={2} key={2} />
            <TimetableIndex number={3} key={3} />
            <TimetableIndex number={4} key={4} />
            <TimetableIndex number={5} key={5} />
        </div>
    );

    let i = 0;
    while (i < 5) {
        let day = props.data[dayId[i]].periods;
        //console.log(day);
        let classes = [];
        let j = 0;
        while (j < 6) {
            let period = day[j];
            if (period !== undefined && period.hasOwnProperty("title") && period.room !== null) {
                let room = "";
                if (period.hasOwnProperty("room")) {
                    room = period.room;
                }
                let displayName = period.title.substring(0, 3);
                let colour = {hex: "#d0d0d0", isDark: false};
                if (classSettings.hasOwnProperty(period.title)) {
                    displayName = classSettings[period.title].displayCode;
                    colour = classSettings[period.title].colour;
                }
                classes.push(
                    <CellTimetable
                        name={displayName}
                        room={room}
                        colour={colour}
                        id={"ttCell" + i.toString() + "-" + j.toString()}
                        key={"ttCol" + i.toString() + "-" + j.toString()}
                        subjectId={period.title}
                        selectedSubject={props.selectedSubject}
                        selectSubject={props.selectSubject}
                    />
                );
            }
            else {
                classes.push(
                    <div className="tt__emptyCell" key={"ttCol" + i.toString() + "-" + j.toString()} />
                );
            }
            j++;
        }

        let isToday = ((i + 1) === props.today ? " tt__dayName--today" : "");
        ttGrid.push(<div className="tt__day" id={"ttCol" + i.toString()} key={"ttCol" + i.toString()}>
            <div className={"tt__dayName" + isToday} >
                {dayNames[i]}
            </div>
            {classes}
        </div>);

        i++;
    }
    //console.log(ttGrid);

    const output = (
        <div className="timetable__week">
            <h2 className="settings tt__wk__heading" style={{textAlign: "left"}}>{"Week " + props.weekName}</h2>
            <div className="tt__wk__wrapper">
                {ttGrid}
            </div>

        </div>
    );

    return output;
}