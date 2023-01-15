import React from 'react';




export default function DemoBanner(props) {


    let bannerInfo = "";
    if (props.page === "bells") {
        bannerInfo = (
            <div>
                <h3>Demo guide:</h3>
                <p><b>This page shows the user's lessons for the day, and which rooms they are held in.</b></p>
                <p><b>Click on a class</b> to see the time and the teacher's name! The default option can be changed in Settings.</p>
                <br />
                <p>During and before school hours, a countdown timer is shown in the top banner to show the time until the next class. At other times this page shows the schedule for the next school day.</p>
                <br />
                <p>+ This guide doesn't pop up in the real version, it's just here to explain how the app works in this demo. Teacher names and classes are fictional for privacy reasons.</p>
                <p>+ This demo version exists so people can see how Generic Bells works without requiring an SBHS login.</p>
            </div>
        )
    }
    else if (props.page === "timetable") {
        bannerInfo = (
            <div>
                <h3>Demo guide:</h3>
                <p>This page shows a user's full timetable. </p>
                <p><b>Click on a class to highlight all the class times for that course!</b></p>
            </div>
        )
    }
    else if (props.page === "barcode") {
        bannerInfo = (
            <div>
                <h3>Demo guide:</h3>
                <p>This page generates the barcode on a student's SBHS ID card. </p>
                <p>Students can use this on their phone to scan-in to school each morning instead of their ID card.</p>
            </div>
        )
    }
    else if (props.page === "notices") {
        bannerInfo = (
            <div>
                <h3>Demo guide:</h3>
                <p>This page shows each day's school notices, which are fetched from the SBHS API on the actual version. </p>
                <p><b>Click on a notice to expand/collapse it. </b> The default option can be changed in Settings.</p>
                <p>+ The notices, activities and teacher names shown here are fictional for privacy reasons.</p>
            </div>
        )
    }
    else if (props.page === "settings") {
        bannerInfo = (
            <div>
                <h3>Demo guide:</h3>
                <p>Generic Bells is highly customisable!</p>
                <p>Users can choose their own colour for each subject, and change the default names.</p>
                <p>+ <b>On the actual version customised settings are saved to localStorage.</b> Unfortunately this demo doesn't do that.</p>
            </div>
        )
    }


    return (
        <div className="group" style={{boxShadow: "none"}}>
            {bannerInfo}
        </div>
    );
}