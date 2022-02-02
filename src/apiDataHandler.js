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
            // classSettings[subjectKey].teacher = (subject.fullTeacher ? subject.fullTeacher : "");
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
                // teacher: (subject.fullTeacher ? subject.fullTeacher : ""),
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

    function addLine(displayAsClass, periodNumber, startTime) {
        /**
         props:

         displayAsClass
         periodNumber
         time
         displayName
         colour {hex, isDark}
         room
         highlightRoom
         -----teacher

         **/
        // class vs break
        if (displayAsClass === false) {
            routine.push({displayAsClass: false, displayName: periodNumber, time: startTime});
            return;
        }

        let periodData = {};
        try {
            periodData = apiData.timetable.timetable.periods[periodNumber];
            if (periodData === undefined) {
                throw new Error("Can't find period info!");
            }
        }
        catch {
                // console.log("Can't find period info!");
                routine.push({displayAsClass: false, displayName: ("Period " + periodNumber), time: startTime});
                return;
        }
        // console.log(periodData);
        // console.log(displayAsClass, periodNumber, startTime);

        if (periodData.hasOwnProperty("title") === false) {
            routine.push({displayAsClass: false, displayName: ("Period " + periodNumber), time: startTime});
            return;
        }

        const classId = periodData.title;
        const savedSettings = classSettings[classId];
        //filter out sport/study periods/non-existent classes
        if (periodData.room === null) {
            routine.push({displayAsClass: false, displayName: savedSettings.displayName, time: startTime});
            return;
        }

        let displayTeacher = "";
        if (periodData.hasOwnProperty("fullTeacher") && periodData.fullTeacher !== null && periodData.fullTeacher !== "") {
            displayTeacher = periodData.fullTeacher;
        }
        else {
            displayTeacher = periodData.teacher;
        }


        // check for variations
        let highlightRoom = false;
        let displayRoom = periodData.room;
        if (apiData.shouldDisplayVariations && apiData.classVariations.hasOwnProperty(periodNumber)) {
            highlightRoom = true;
            const variationData = apiData.classVariations[periodNumber];
            if (variationData.type === "novariation") {
                highlightRoom = false;
            }
            else if (variationData.title === classId) {
                if (variationData.hasOwnProperty("roomTo")) {
                    if (variationData.roomTo === null || variationData.roomTo === "") {
                        if (variationData.type === "nocover") {
                            displayRoom = "-";
                        }
                    }
                    else {
                        displayRoom = variationData.roomTo;
                    }
                }
                if (variationData.hasOwnProperty("casualSurname")) {
                    if (variationData.casualSurname !== null && variationData.casualSurname !== "") {
                        displayTeacher = variationData.casualSurname;
                    }
                    else if (variationData.hasOwnProperty("casual")) {
                        if (variationData.casual !== null && variationData.casual !== "") {
                            displayTeacher = variationData.casual;
                        }
                    }
                }
            }
        }

        //add to routine
        routine.push({
            displayAsClass: true,
            "periodNumber": periodNumber,
            "time": startTime,
            'displayName': savedSettings.displayName,
            'colour': savedSettings.colour,
            'room': displayRoom,
            'highlightRoom': highlightRoom,
            'teacher': displayTeacher
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