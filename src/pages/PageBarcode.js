import React, { useState } from 'react';
import { code128 } from '../assets/code128TranslationData';
import {passItem, passStr, saveItem, saveStr} from "../version";
import {resizeIcon} from "../assets/nav-icons";
import SavedBarcode from "../components/SavedBarcode";

const SID_saveBarcodes = "save_barcodes";


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

    const [code, setCode] = useState(initialBarcode);
    const [barcodeSize, setBarcodeSize] = useState(initialSize);
    const [savedBarcodes, setSavedBarcodes] = useState(initSavedBarcodes);

    function initialBarcode() {
        if (props.userIdCode !== "") {
            return props.userIdCode;
        }
        else {
            return "000000000";
        }
    }

    function handleEntry(e) {
        setCode(e.target.value);
        setAddBarcodeCode(e.target.value);
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

    function initSavedBarcodes() {
        const saved = passItem(SID_saveBarcodes);
        let output = [];
        if (saved !== null) {
            output = [...saved];
        }
        if (props.userIdCode !== "")  {
            let i = 0;
            while (i < output.length) {
                if (props.userIdCode === output[i].code && "myId" === output[i].name) {
                    return output;
                }
                i++;
            }
            output.splice(0, 0, {'code': code, 'name': "myId"});
            saveItem(SID_saveBarcodes, output);
        }

        return output;
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

    function saveABarcode() {
        if (addBarcodeCode !== "") {
            let i = 0;
            while (i < savedBarcodes.length) {
                if (savedBarcodes[i].code === addBarcodeCode) {
                    return false;
                }
                i++;
            }
            let saveBarcodeData = [...savedBarcodes, {'code': addBarcodeCode, 'name': addBarcodeName}];
            saveItem(SID_saveBarcodes, saveBarcodeData);
            setSavedBarcodes(saveBarcodeData);
        }
    }

    function handleSelectSavedBarcode(savedCode) {
        setCode(savedCode);
        setAddBarcodeCode(savedCode);
    }

    function handleDeleteSavedBarcode(id) {
        let barcodes = [...savedBarcodes];
        barcodes.splice(id, 1);
        saveItem(SID_saveBarcodes, barcodes);
        setSavedBarcodes(barcodes);
    }

    const [addBarcodeName, setAddBarcodeName] = useState("");
    const [addBarcodeCode, setAddBarcodeCode] = useState(code);

    function handleBarcodeCode(e) {
        setAddBarcodeCode(e.target.value);
    }

    function handleBarcodeName(e) {
        setAddBarcodeName(e.target.value);
    }

    let savedBarcodeList = [];
    let i = 0;
    while (i < savedBarcodes.length) {
        savedBarcodeList.push(
            <SavedBarcode
                key={savedBarcodes[i].code + (savedBarcodes[i].code === code ? "-" : "") + i.toString()}
                id={i}
                code={savedBarcodes[i].code}
                selected={savedBarcodes[i].code === code}
                name={savedBarcodes[i].name}
                handleClick={handleSelectSavedBarcode}
                handleDelete={handleDeleteSavedBarcode}
                noDelete={(savedBarcodes[i].code === props.userIdCode)}
            />
        );
        i++;
    }

    function deleteAllSavedBarcodes() {
        localStorage.removeItem(SID_saveBarcodes);
        setSavedBarcodes([]);
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


            <div className="savedBarcode__container">
                <div className="saveBarcodeBoxes">
                    <h3>Saved barcodes</h3>
                    {savedBarcodeList}
                </div>
                <div className="saveBarcodeBoxes">
                    <h3>Save a barcode</h3>
                    <div id="saveBarcodeForm__code">
                        <input
                            type="text"
                            maxLength={50}
                            id="saveBarcode__input"
                            value={addBarcodeName}
                            onChange={handleBarcodeName}
                            placeholder="name (optional)"
                            className="inputBox"
                        />
                    </div>
                    <div id="saveBarcodeForm">
                        <input
                            type="text"
                            maxLength={20}
                            id="saveBarcode__codeInput"
                            value={addBarcodeCode}
                            onChange={handleBarcodeCode}
                            placeholder="barcode value (numbers only)"
                            className="inputBox"
                        />
                        <div className="button" id="saveBarcode__submit" onClick={saveABarcode}>Save</div>
                    </div>
                </div>
            </div>
            <div className="button" onClick={resetBarcode}>Reset current barcode to my ID</div>
            <div className="button" onClick={deleteAllSavedBarcodes}>Delete all saved barcodes</div>
        </div>
    );



    return output;
}