import { colourPack } from './assets/colours';
import { passItem, saveItem } from "./version";

export function configSettings(apiData) {
    const classData = apiData;

    let storedSettings = passItem('displaySettings');
    if (storedSettings === null) {
        storedSettings = {};
    }

    let classSettings = {};
    /**
     * classSettings = {}
     * teacher
     * displayName
     * displayCode
     * colour {}:
     *      hex
     *      isDark
     *
     * **/
    let defaultColour = colourPack[9];
    let colours = JSON.parse(JSON.stringify(colourPack));
    for (const title in classData) {
        const subject = classData[title];
        const subjectKey = subject.shortTitle;

        if (storedSettings.hasOwnProperty(subjectKey)) {
            classSettings[subjectKey] = storedSettings[subjectKey];
            classSettings[subjectKey].teacher = (subject.fullTeacher ? subject.fullTeacher : "");
            let i = 0;
            for (const col of colours) {
                if (classSettings[subjectKey].colour.hex === col.hex) {
                    colours.splice(i, 1);
                    break;
                }
                i++;
            }
        }
        else {

            let displayName = "-";
            let displayCode = subjectKey.substring(0, 3);
            let colour;
            if (subject.teacher === null) {
                colour = defaultColour;
            }
            else if (colours.length > 0) {
                colour = Object.assign(colours[0]);
                colours.splice(0, 1);
            }
            else {
                colour = defaultColour;
            }

            const rawSubjectName = subject["subject"].trim();
            const lastSpace = rawSubjectName.lastIndexOf(" ");
            if (lastSpace !== -1) {
                displayName = rawSubjectName.substring(0, lastSpace);
            }
            else {
                displayName = rawSubjectName;
            }

            // console.log(subject.title);

            classSettings[subject.shortTitle] = {
                teacher: (subject.fullTeacher ? subject.fullTeacher : ""),
                'displayName': displayName,
                'colour': colour,
                'displayCode': displayCode,
                'rawName': subject.title,
                'refId': subject.shortTitle,
                'defaultName': displayName
            }

        }
    }

    saveItem('displaySettings', classSettings);

    return classSettings;
}

export function apiDataHandler(apiData) {
    if (Object.keys(apiData).length === 0) {
        return false;
    }

    let routine = [];
    const classSettings = configSettings(apiData.timetable.subjects);

    function addLine(displayAsClass, slotName, startTime) {
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
        // class vs break
        if (displayAsClass === false) {
            routine.push({displayAsClass: false, displayName: slotName, time: startTime});
            return;
        }

        //fetch data
        let periodData;
        try {
            periodData = apiData.timetable.timetable.periods[slotName];
            if (periodData === undefined) {
                throw new Error("Can't find period info!");
            }
        }
        catch {
            routine.push({displayAsClass: false, displayName: ("Period " + slotName), time: startTime});
            return;
        }
        const classId = periodData.title;
        const periodNumber = slotName;
        // console.log(classId);
        // console.log(classSettings);
        const displayName = classSettings[classId].displayName;
        const colour = classSettings[classId].colour;
        const room = periodData.room;
        let highlightRoom = false;
        const teacher = periodData.fullTeacher;
        //filter out sport/study periods/non-existent classes
        if (classSettings[classId].teacher == false) {
            routine.push({displayAsClass: false, displayName: displayName, time: startTime});
            return;
        }
        // TODO: check for variations

        //add to routine
        routine.push({
            displayAsClass: true,
            "periodNumber": periodNumber,
            "time": startTime,
            'displayName': displayName,
            'colour': colour,
            'room': room,
            'highlightRoom': highlightRoom,
            'teacher': teacher
        })
    }

    let isTheLastSlotABreak = false;



    for (const timeSlot of apiData.bells) {
        if (timeSlot.period === "0") {
            try {
                let slotName = apiData.timetable.timetable.periods["0"];
                if (slotName === undefined) {
                    throw new Error("There's no morning class today!");
                }
                addLine(true, "0", timeSlot.startTime);
            }
            catch {
                addLine(false, "no morning class", "");
            }
            continue;
        }
        else if (timeSlot.type === "O") {
            continue;
        }
        if (isTheLastSlotABreak) {
            if (timeSlot.type !== "R") {
                isTheLastSlotABreak = false;
            }
            else {
                continue;
            }
        }
        if (timeSlot.type === "R") {
            let breakName;
            if (timeSlot.period === "R") {
                breakName = "Recess";
            }
            else if (timeSlot.period.slice(-2) === "L1") {
                breakName = "Lunch";
            }
            else {
                breakName = timeSlot.period;
            }
            addLine(false, breakName, timeSlot.startTime);
            isTheLastSlotABreak = true;
        }
        else if (timeSlot.type === "T") {
            addLine(true, timeSlot.period, timeSlot.startTime);
        }
        else {
            addLine(false, timeSlot.bellDisplay, timeSlot.startTime);
        }

    }





    return routine;
}