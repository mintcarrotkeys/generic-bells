import React, { useState, useEffect } from 'react';


export default function Clock(props) {
    const targetTime = props.targetTime;
    const [timeLeft, setTimeLeft] = useState(Math.floor((targetTime - Date.now()) / 1000));


    let minutes = Math.floor(timeLeft / 60).toString();
    if (minutes.length === 1) {
        minutes = "0" + minutes;
    }
    let seconds = (timeLeft % 60).toString();
    if (seconds.length === 1) {
        seconds = "0" + seconds;
    }

    const output = <div className="topBar__countdown">{minutes}:{seconds}</div>;

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