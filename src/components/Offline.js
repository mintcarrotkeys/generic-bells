import React from "react";
import {noConnectionIcon} from "../assets/nav-icons";


export default function Offline(props) {

    function reloadPage() {
        window.location.reload();
    }

    return(
        <div className="noConnection darkBanner group" onClick={reloadPage}>
            {noConnectionIcon}
            <div>
                Failed to update data. Click this to reload.
            </div>
        </div>
    )
}