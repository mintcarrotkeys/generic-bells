import React, { useState } from 'react';
import WeekTimetable from "../components/WeekTimetable";
import {configSettings} from "../apiDataHandler";
import {getWeekNum} from "../apiFetcher";
import {passStr} from "../version";


export default function PageTimetable(props) {

    const [selectedSubject, setSelectedSubject] = useState(null);

    if (Object.keys(props.data).length === 0) {
        return (
            <div className="page__timetable page__prop">
            <h1 className="bigHeading">Timetable</h1>
            </div>
        );
    }

    function handleClickPage() {
        if (selectedSubject !== null) {
            setSelectedSubject(null);
        }
    }

    function handleSetSelectedSubject(subjectId) {
        setSelectedSubject(subjectId);
    }


    let subjects = props.data.subjects;
    let subjectObject = {};
    let i = 0;
    while (i < subjects.length) {
        subjectObject[subjects[i].shortTitle] = subjects[i];
        i++;
    }
    const days = props.data.days;

    const dataABC = [
        {
            'a': days["1"],
            'b': days["2"],
            'c': days["3"],
            'd': days["4"],
            'e': days["5"],
        },
        {
            'a': days["6"],
            'b': days["7"],
            'c': days["8"],
            'd': days["9"],
            'e': days["10"],
        },
        {
            'a': days["11"],
            'b': days["12"],
            'c': days["13"],
            'd': days["14"],
            'e': days["15"],
        }
    ];

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
        if (weekDiff < 0) {
            weekDiff = 3 + weekDiff;
        }
        // console.log(dayDiff);
        // console.log(weekDiff);
        return {day: dayDiff, week: weekDiff};
    }

    let orderInfo = {day: 0, week: -1};
    if (props.sync.hasOwnProperty("weekNo")) {
        orderInfo = calcToday(props.sync);
    }

    let weeks = [];
    let timetableWeekOrder = passStr("set_tt_week_order");

    const weekNames = ['A', 'B', 'C'];
    let j = 0;
    if (timetableWeekOrder === "yes") {
        j = orderInfo.week;
    }
    while (weeks.length < 3) {
        let todayVal = 0;
        if (orderInfo.week === j) {
            todayVal = orderInfo.day;
        }
        weeks.push(
            <WeekTimetable
                weekName={weekNames[j]}
                today={todayVal}
                data={dataABC[j]}
                key={weekNames[j]}
                selectedSubject={selectedSubject}
                selectSubject={handleSetSelectedSubject}
            />
        )
        j++;
        if (j >= 3) {
            j = 0;
        }
    }




/**** OLD LOGIC
    if (timetableWeekOrder === "yes") {
        // console.log("Timetable order set to current week first")
        if (orderInfo.week <= 0) {
            weeks = [
                <WeekTimetable weekName={"A"} today={orderInfo.day} data={dataA} key={"weekA"}/>,
                <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"}/>,
                <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"}/>
            ]
        }
        else if (orderInfo.week === 1) {
            weeks = [
                <WeekTimetable weekName={"B"} today={orderInfo.day} data={dataB} key={"weekB"}/>,
                <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"}/>,
                <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"}/>
            ]
        }
        else if (orderInfo.week === 2) {
            weeks = [
                <WeekTimetable weekName={"C"} today={orderInfo.day} data={dataC} key={"weekC"}/>,
                <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"}/>,
                <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"}/>
            ]
        }
    }
    else {
        // console.log("Timetable order set to static")
        if (orderInfo.week <= 0) {
            weeks = [
                <WeekTimetable weekName={"A"} today={orderInfo.day} data={dataA} key={"weekA"} />,
                <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"} />,
                <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"} />
            ]
        }
        else if (orderInfo.week === 1) {
            weeks = [
                <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"} />,
                <WeekTimetable weekName={"B"} today={orderInfo.day} data={dataB} key={"weekB"} />,
                <WeekTimetable weekName={"C"} today={0} data={dataC} key={"weekC"} />
            ]
        }
        else if (orderInfo.week === 2) {
            weeks = [
                <WeekTimetable weekName={"A"} today={0} data={dataA} key={"weekA"} />,
                <WeekTimetable weekName={"B"} today={0} data={dataB} key={"weekB"} />,
                <WeekTimetable weekName={"C"} today={orderInfo.day} data={dataC} key={"weekC"} />
            ]
        }
    }
****/

    const output = (
        <div className="page__timetable page__prop" onClick={handleClickPage}>
            {weeks}
        </div>
    );



    return output;
}