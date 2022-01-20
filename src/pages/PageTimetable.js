import React, { useState } from 'react';
import WeekTimetable from "../components/WeekTimetable";
import {configSettings} from "../apiDataHandler";
import {getWeekNum} from "../apiFetcher";


export default function PageTimetable(props) {
    if (Object.keys(props.data) == false) {
        return null;
    }
    /****/

    console.log(props.data);

    let subjects = props.data.subjects;
    let subjectObject = {};
    let i = 0;
    while (i < subjects.length) {
        subjectObject[subjects[i].shortTitle] = subjects[i];
        i++;
    }
    const days = props.data.days;

    const dataA = {
        'a': days["1"],
        'b': days["2"],
        'c': days["3"],
        'd': days["4"],
        'e': days["5"],
    };
    const dataB = {
        'a': days["6"],
        'b': days["7"],
        'c': days["8"],
        'd': days["9"],
        'e': days["10"],
    };
    const dataC = {
        'a': days["11"],
        'b': days["12"],
        'c': days["13"],
        'd': days["14"],
        'e': days["15"],
    };

    configSettings(subjectObject);

    function calcToday(sync) {
        const today = new Date();
        let showDay;
        let dayDiff;
        if (today.getDay() === 6) {
            showDay = today.getTime() + 2*24*60*60*1000;
            dayDiff = 1;
        }
        else if (today.getDay() === 0) {
            showDay = today.getTime() + 24*60*60*1000;
            dayDiff = 1;
        }
        else {
            showDay = today.getTime();
            dayDiff = today.getDay();
        }

        let weekNo = getWeekNum(showDay);
        let weekDiff = ((weekNo - sync.weekNo) + sync.weekDiff) % 3;

        return {day: dayDiff, week: weekDiff};
    }

    const orderInfo = calcToday(props.sync);

    let weeks = [];
    if (orderInfo.week === 0) {
        weeks = [
            <WeekTimetable weekName={"A"} today={orderInfo.day} data={dataA} key={"weekA"} />,
            <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"} />,
            <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"} />
        ]
    }
    else if (orderInfo.week === 1) {
        weeks = [
            <WeekTimetable weekName={"B"} today={orderInfo.day} data={dataB} key={"weekB"} />,
            <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"} />,
            <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"} />
        ]
    }
    else if (orderInfo.week === 2) {
        weeks = [
            <WeekTimetable weekName={"C"} today={orderInfo.day} data={dataC} key={"weekC"} />,
            <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"} />,
            <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"} />
        ]
    }
    else {
        console.log("Error when generating timetable.");
    }

    const output = (
        <div className="page__timetable page__prop">
            {weeks}
        </div>
    );



    return output;
}