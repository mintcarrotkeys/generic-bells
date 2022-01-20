import React, { useEffect, useState } from 'react';


export default function TimetableIndex(props) {
    /**
     * number
     *
     *
     *
     *
     * **/
    return (
        <div className="tt__index">
            <div className="tt__index__icon">
                {props.number}
            </div>
        </div>
    );
}