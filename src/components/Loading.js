import React from "react";
import {loadingIcon} from "../assets/nav-icons";


export default function Loading(props) {


    return(
        <div className="noConnection loadingGroup group">
            {loadingIcon}
            <div>
                Checking for new data ...
            </div>
        </div>
    )
}