import React from "react";
import {noConnectionIcon} from "../assets/nav-icons";


export default function Offline(props) {


    return(
        <div className="noConnection group">
            {noConnectionIcon}
            <div>
                Failed to fetch data. Reload to try again.
                The last saved version will be shown.
            </div>
        </div>
    )
}