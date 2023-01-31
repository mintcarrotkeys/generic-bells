import React, {useState} from "react";
import {swapTheme} from "../themeManager";
import {passStr} from "../version";
import {theme} from "../assets/nav-icons";
import {dark_light_triangle} from "../assets/mui_icons";


export default function TryDarkMode(props) {
    /***
     props.updateTheme()

     */

    const [isDark, setIsDark] = useState(passStr('isDarkMode'));

    function changeTheme() {
        swapTheme();
        props.updateTheme();
        setIsDark(!isDark);
    }

    let buttonIcon = "";
    if (isDark) {
        buttonIcon = theme.sun;
    }
    else {
        buttonIcon = theme.moon;
    }

    let out = (
        <div className="group" style={{width: "fit-content", margin: "10px auto"}}>
            <div className="theme_switch_banner" onClick={changeTheme}>
                <button className="small__button settings button" >{buttonIcon}</button>
                <h4 className="settings swap-theme-text">
                    dark mode
                </h4>
                {dark_light_triangle}
                <h4 className="settings swap-theme-text">
                    light mode
                </h4>
            </div>
        </div>
    )

    return out;
}