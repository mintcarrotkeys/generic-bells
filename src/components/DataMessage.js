import React, { useState } from 'react';
import { noteIcon } from "../assets/nav-icons";


export default function DataMessage(props) {

    const output = (
        <div className="askLogin button" id="redirect_to_login">
            {noteIcon}
            <div>
                Login to view the latest data.
            </div>
        </div>
    );

    return output;
}

