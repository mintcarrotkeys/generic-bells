import React, { useState } from 'react';
import {closeIcon} from "../assets/nav-icons";


export default function SavedBarcode(props) {

    const [selected, setSelected] = useState((props.selected));

    function handleClick() {
        if (selected === false) {
            props.handleClick(props.code);
        }
        setSelected(!selected);
    }

    function handleDelete() {
        props.handleDelete(props.id);
    }

    const output = (

        <div
            className={"group savedBarcode" + (selected ? " savedBarcode--selected" : "")}
            onClick={handleClick}
        >
            <h3 className="savedBarcode__name"><b>{props.name}</b></h3>
            <h3 className="savedBarcode__code">{props.code}</h3>
            {((props.noDelete && props.name==="myId") ? "" :
                <div className="savedBarcode__closeIcon savedBarcode__closeIcon__wrapper" onClick={handleDelete}>{closeIcon}</div>
            )}
        </div>
    );




    return output;
}