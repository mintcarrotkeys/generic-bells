import React, { useState } from "react";

export default function Break(props) {
    /**
     props:

     time
     displayName
     TODO: add a full name option to expanded card and truncate main title

     **/
    // console.log(props);

    const output = (
        <div className="break page__bells__row">
            <div className="break__name">
                {props.displayName}
            </div>
            <div className="break__time">
                {props.time}
            </div>
        </div>
    );

    return output;
}