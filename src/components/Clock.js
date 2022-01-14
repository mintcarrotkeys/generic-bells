import React, { useState, useEffect } from 'react';


export default function Clock(props) {
    const targetTime = props.targetTime;
    const [timeLeft, setTimeLeft] = useState(Math.floor((targetTime - Date.now()) / 1000));

    let output;

    if (timeLeft >= 3600) {
        let hours = Math.floor(timeLeft / 3600);

        let minutes = Math.floor((timeLeft - hours*3600) / 60).toString();
        hours = hours.toString();
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        let seconds = (timeLeft % 60).toString();
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        output = <div className="topBar__countdown topBar__countdown--long">{hours}:{minutes}:{seconds}</div>;
    }
    else {
        let minutes = Math.floor(timeLeft / 60).toString();
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        let seconds = (timeLeft % 60).toString();
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        output = <div className="topBar__countdown">{minutes}:{seconds}</div>;
    }


    function tick() {
        setTimeLeft(Math.floor((targetTime - Date.now()) / 1000));
    }


    useEffect(() => {
        let timer = setInterval(tick, 1000);

        return function cleanup() {
            clearInterval(timer);
        }
    });

    if (timeLeft < 0) {
        return null;
    }


    return output;
}