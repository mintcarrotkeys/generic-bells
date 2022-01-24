import React, { useState } from 'react';
import {colPickerIcons} from "../assets/nav-icons";
import ColourPicker from "./ColourPicker";




export default function ClassInfo(props) {

    /**
     * rawName
     * displayName
     * colour: hex, isDark
     * displayCode
     * refId
     *
     * reportInput
     *
     * **/
    const [data, setData] = useState(props.obj);
    const [colPicker, setColPicker] = useState(false);

    function handleName(e) {
        e.preventDefault();
        props.reportInput(data.refId, 'displayName', e.target.value);
        setData({...data, ...{'displayName': e.target.value}});
    }

    function handleCode(e) {
        e.preventDefault();
        props.reportInput(data.refId, 'displayCode', e.target.value);
        setData({...data, ...{'displayCode': e.target.value}});
    }

    function checkName(e) {
        if (data.displayName === "") {
            props.reportInput(data.refId, 'displayName', data.defaultName);
            setData({...data, ...{'displayName': data.defaultName}});
        }
    }
    function checkCode(e) {
        if (data.displayCode === "") {
            props.reportInput(data.refId, 'displayCode', data.refId.substring(0, 3));
            setData({...data, ...{'displayCode': data.refId.substring(0, 3)}});
        }
    }

    function handleCol(e) {
        setColPicker(!colPicker);
    }

    function reportCol(colObj) {
        props.reportInput(data.refId, 'colour', colObj);
        setColPicker(false);
        setData({...data, ...{'colour': colObj}});
    }

    const styleSettings = {
        backgroundColor: data.colour.hex,
        color: (data.colour.isDark ? '#ffffff' : '#222222'),
        // border: (colPicker ? (data.colour.isDark ? 'solid 2px #d0d0d0' : 'solid 2px #222222') : 'solid 1px #d0d0d0'),
        border: (colPicker ? 'solid 2px #222222' : 'solid 1px #d0d0d0'),
        padding: (colPicker ? '0px' : '1px')
    };

    const output = (
        <div className="settings__classInfo">
            <h4 className="settings">{data.rawName}</h4>
            <div className="settings settings__classInfo__row">
                <div className="settings__classInfo__col" style={styleSettings} onClick={handleCol}>
                    {(colPicker ? colPickerIcons.close : colPickerIcons.drop)}
                </div>
                <input
                    type="text"
                    id={data.refId + 'n'}
                    className="inputBox settings__classInfo__name"
                    autoComplete="off"
                    value={data.displayName}
                    onChange={handleName}
                    onBlur={checkName}
                />
                <input
                    type="text"
                    id={data.refId + 'c'}
                    className="inputBox settings__classInfo__code"
                    autoComplete="off"
                    value={data.displayCode}
                    onChange={handleCode}
                    onBlur={checkCode}
                    maxLength={4}
                />
            </div>
            {(colPicker ? <ColourPicker reportCol={reportCol} current={data.colour} /> : "")}
        </div>
    );



    return output;
}