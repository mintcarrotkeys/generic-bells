import { colourPack } from './assets/colours';


export function apiDataHandler(apiData) {
    if (Object.keys(apiData) == false) {
        return false;
    }


    function configSettings() {
        const classData = apiData.timetable.subjects;
        //TODO: fetch default and localStorage settings here
        let storedSettings = localStorage.getItem('displaySettingszzzzz');
        if (storedSettings !== null) {
            storedSettings = JSON.parse(storedSettings);
        }
        else {
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
                    if (classSettings[subjectKey].displayColour.hex === col.hex) {
                        colours.splice(i, 1);
                        break;
                    }
                    i ++;
                }
            }
            else {

                let displayName = "-";
                let displayCode = subjectKey.substring(0, 3);
                let displayColour;
                if (subject.teacher === null) {
                    displayColour = defaultColour;
                }
                else if (colours.length > 0) {
                    displayColour = Object.assign(colours[0]);
                    colours.splice(0, 1);
                }
                else {
                    displayColour = defaultColour;
                }

                const rawSubjectName = subject["subject"].trim();
                const lastSpace = rawSubjectName.lastIndexOf(" ");
                if (lastSpace !== -1) {
                    displayName = rawSubjectName.substring(0, lastSpace);
                }
                else {
                    displayName = rawSubjectName;
                }


                classSettings[subject.shortTitle] = {
                    teacher: (subject.fullTeacher ? subject.fullTeacher : ""),
                    'displayName': displayName,
                    'displayColour': displayColour,
                    'displayCode': displayCode
                }

            }
        }
        // localStorage.setItem('displaySettings', JSON.stringify(classSettings));

        return classSettings;
    }

    let routine = [];
    const classSettings = configSettings();

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
        const periodData = apiData.timetable.timetable.periods[slotName];
        const classId = periodData.title;
        const periodNumber = slotName;
        const time = startTime;
        // console.log(classId);
        // console.log(classSettings);
        const displayName = classSettings[classId].displayName;
        const colour = classSettings[classId].displayColour;
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
                addLine(true, "0", timeSlot.startTime);
            }
            catch {
                addLine(false, "Morning", "");
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