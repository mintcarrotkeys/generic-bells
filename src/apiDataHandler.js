import { colours } from './assets/colours';


export function apiDataHandler(apiData) {
    if (Object.keys(apiData) == false) {
        return false;
    }





    function configSettings() {
        const classData = apiData.timetable.subjects;
        //TODO: fetch default and localStorage settings here

        let classSettings = {};
        for (const subjectId in classData) {
            // console.log(subjectId);
            const subject = classData[subjectId];
            const rawSubjectName = subject["subject"].trim();
            const subjectName = rawSubjectName.substring(0, rawSubjectName.lastIndexOf(" "));

            //TODO: check for displayName in LocalStorage data and default data
            const nameToUse = subjectName;

            //TODO: get a colour
            const colour = {hex: "#92c748", isDark: false};

            classSettings[subject.shortTitle] = {
                teacher: (subject.fullTeacher ? subject.fullTeacher : ""),
                'displayName': nameToUse,
                'displayColour': colour
            }
        }
        return classSettings;
    }

    let routine = [];
    const classSettings = configSettings();

    function addLine(displayAsClass, slotName, startTime) {
        /**
         props:

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