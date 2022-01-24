import React, { useState } from 'react';
import { code128 } from '../assets/code128TranslationData';


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

    const [code, setCode] = useState(props.userIdCode);

    function handleEntry(e) {
        setCode(e.target.value);
    }

    const output = (
        <div className="page__barcode page__prop">
            <h1>Barcode</h1>
            <input
                type="text"
                id="condeInput"
                className="inputBox barcodeInput"
                value={code}
                onChange={handleEntry}
            />
            <div className="button resetBarcodeId" onClick={() => setCode(props.userIdCode)}>Reset</div>
            <div className="barcodeOutput">{(code!=="" ? encoder(code) : encoder("00000000"))}</div>
        </div>
    );



    return output;
}