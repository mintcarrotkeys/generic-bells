import React, { useEffect, useState } from 'react';


export default function CellTimetable(props) {
    /**
     * name
     * room
     *
     *
     *
     * **/
    const iconStyle = {
        backgroundColor: props.colour.hex,
        color: (props.colour.isDark ? 'white' : 'black')
    }


    const output = (
        <div className="tt__cell">
            <div className="tt__cell__name" style={iconStyle}>{props.name}</div>
            <div className="tt__cell__room">{props.room}</div>


        </div>
    );


    return output;
}