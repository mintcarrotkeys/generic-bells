import React, { useState } from 'react';
import { code128 } from '../assets/code128TranslationData';
import {passStr, saveStr} from "../version";
import {resizeIcon} from "../assets/nav-icons";


export default function PageBarcode(props) {

    function encoder(input) {
        const checkValid = parseInt(input);
        if (isNaN(checkValid)) {
            return 0;
        }
        // const startC = 'Í';
        // const valueStartC = 105;
        // const switchCtoB = 'È';
        const stopCode = 'Î';
        let output = "Í";

        let i = 0;
        let checksumValue = 105;
        let checksumChar = 1;
        let currentString;
        while (i < input.length) {
            currentString = input.substring(i, i+2);
            if (currentString.length === 2) {
                output += code128.translate[currentString];
                checksumValue += (Number(currentString) * checksumChar);
                checksumChar += 1;
            }
            else if (currentString.length === 1) {
                output += code128.translate[currentString];
                checksumValue += (checksumChar * 100);
                checksumChar += 1;
                checksumValue += (checksumChar * (Number(currentString) + 16));
                checksumChar += 1;
            }
            i += 2;
        }

        const checksum = code128.check[(checksumValue % 103).toString()];
        // console.log(checksumValue % 103);
        output += checksum;
        output += stopCode;

        return output;
    }

    const storeBarcodeSize = "barcode_size";

    const [code, setCode] = useState(props.userIdCode);
    const [barcodeSize, setBarcodeSize] = useState(initialSize);

    function handleEntry(e) {
        setCode(e.target.value);
    }


    function initialSize() {
        let savedSize = passStr(storeBarcodeSize);
        // console.log(savedSize);
        if (savedSize !== null && Number(savedSize) >= 0 && Number(savedSize) <= 10) {
            // console.log(Number(savedSize));
            return Number(savedSize);
        }
        else {
            return 5;
        }
    }

    function handleSize(dir) {
        // console.log(dir);
        // console.log(barcodeSize);
        if (dir === "+" && barcodeSize < 10) {
            saveStr(storeBarcodeSize, (barcodeSize + 1).toString());
            setBarcodeSize(barcodeSize + 1);
        }
        else if (dir === "-" && barcodeSize > 0) {
            saveStr(storeBarcodeSize, (barcodeSize - 1).toString());
            setBarcodeSize(barcodeSize - 1);
        }
        else {
            console.log("Problem resizing barcode");
        }
    }

    function resetBarcode() {
        localStorage.removeItem(storeBarcodeSize);
        setBarcodeSize(5);
        setCode(props.userIdCode);
    }

    const output = (
        <div className="page__barcode page__prop">
            <h1 className="bigHeading">Barcode</h1>
            <input
                type="text"
                id="condeInput"
                className="inputBox barcodeInput"
                value={code}
                onChange={handleEntry}
            />
            <div className="button resetBarcodeId" onClick={resetBarcode}>Reset</div>
            <div className="barcodeResize__container">
                <div>smaller</div>
                <button className="barcodeResize__button" onClick={() => handleSize("-")}>
                    {resizeIcon.minus}
                </button>
                <div>Adjust size</div>
                <button className="barcodeResize__button" onClick={() => handleSize("+")}>
                    {resizeIcon.plus}
                </button>
                <div>bigger</div>
            </div>
            <div className="barcodeOutput" style={{fontSize: ("calc(" + (barcodeSize*10).toString() + "px + 10vw)")}}>
                {(code!=="" ? encoder(code) : encoder("00000000"))}
            </div>
        </div>
    );



    return output;
}