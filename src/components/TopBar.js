import React, { useState } from 'react';



export default function TopBar(props) {
    // props.data = apiData
    let date = props.data.date;
    let timestamp = Date.parse(date + "T23:59:59").toString();

    const output = (
        <div className="topBar period">
            {props.dayName}
        </div>
    );

    return output;
}

