import React, { useState } from 'react';
import {passStr} from "../version";
import {darkColours, lightColours} from "../themeManager";

export default function ColourPicker(props) {

    const [current, setCurrent] = useState(props.current.hex);

    React.useEffect(() => {
        setCurrent(props.current.hex);
    }, [props.current]);

    /**
     *
     * current
     *
     * reportCol
     *
     *
     * **/


    /***
    let customColour = '';

    function customCol(input) {
        let hex = input;
        if (hex.substring(0, 1) === "#") {
            hex = hex.substring(0, 6);
        }
        if (hex.length === 3) {
            hex = hex.substring(0,1) + hex.substring(0,1) +
                hex.substring(1,2) + hex.substring(1,2) +
                hex.substring(2,3) + hex.substring(2,3);
        }

        const parsed = parseInt(hex, 16);
        if (isNaN(parsed) || hex.length != 6) {
            return {hex: '#333333', isDark: true};
        }

        let contrast = (0.21 * parseInt(hex.substring(0,2), 16)
            + 0.71 * parseInt(hex.substring(2,4), 16)
            + 0.07 * parseInt(hex.substring(4,6), 16)) / 256;
        console.log(contrast);
        if (contrast < 0.5) {
            return {hex: "#" + hex, isDark: true};
        }
        else {
            return {hex: "#" + hex, isDark: false};
        }
    }
     **/

    let colourPack;
    let currentTheme = passStr('isDarkMode');
    if (currentTheme) {
        colourPack = [...darkColours];
    }
    else {
        colourPack = [...lightColours];
    }

    function handleClick(e) {
        props.reportCol(colourPack[Number(e.target.id.substring(5, 20))]);
        setCurrent(colourPack[Number(e.target.id.substring(5, 20))].hex);
    }

    let i = 0;
    let colRow = [];
    while (i < colourPack.length) {
        let col = colourPack[i];
        let styleSettings = {
            backgroundColor: col.hex,
        }
        let classes = "";
        if (current === col.hex) {
            classes = " settings__classInfo__col--selected";
        }
        colRow.push(
            <div
                id={"colOp" + i}
                key={i}
                className={"colPicker__option settings__classInfo__col" + classes}
                style={styleSettings}
                onClick={handleClick}
            />
        );
        i++;
    }

    let output = (
        <div className="colPicker">
            {colRow}
        </div>
    );

    return output;
}