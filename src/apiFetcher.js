import React from 'react';

// document.getElementById('version').textContent = "v1.0.1";

export async function requestToken() {
    const redirect = encodeURIComponent('https://genericbells.pages.dev');
    const appId = "genericbells10";
    localStorage.setItem('access_age', Date.now().toString());
    localStorage.removeItem('handle_access');
    const codeVerifier = localStorage.getItem('handle_verifier');
    const state = localStorage.getItem('handle_state');
    if (codeVerifier == null) {
        return false;
    }
    const params = new URLSearchParams(window.location.href.toString().split("?")[1]);
    window.history.replaceState({}, "", "/");
    if (params.has('code') === false) {
        return false;
    }
    const code = params.get('code');
    const returnedState = params.get('state');
    if (returnedState !== state) {
        return false;
    }
    const requestBody = (
        "grant_type=authorization_code" +
        "&redirect_uri=" + redirect +
        "&client_id=" + appId +
        "&code=" + code +
        "&code_verifier=" + codeVerifier
    );
    const requestURL = (
        "https://student.sbhs.net.au/api/token"
    );

    let response = await fetch(requestURL, {
        method: "POST",
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: requestBody});
    if (!response.ok) {
        console.log("Error fetching tokens. -1");
        response = await fetch(requestURL, {
            method: "POST",
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: requestBody});
        if (!response.ok) {
            console.log('Error fetching tokens. -2');
            return false;
        }
    }
    const tokens = await response.json();
    // console.log(tokens);
    localStorage.setItem('handle_access', tokens['access_token']);
    localStorage.setItem('access_age', Date.now().toString());

    return true;
}
//returns false for problems, true for ok

export async function requestCode() {
    const redirect = encodeURIComponent('https://genericbells.pages.dev');
    const appId = "genericbells10";
    //generate code verifier 43-128 characters long
    function randomString(length) {
        let randomNumbers = new Uint32Array(length);
        let verifier = "";
        const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        crypto.getRandomValues(randomNumbers);
        for (const i of randomNumbers) {
            verifier += allowedChars.charAt((i % 66));
        }
        return verifier;
    }
    async function digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return hash;
    }
    function base64url(input) {
        let hashString = "";
        for (const i of input) {
            hashString += String.fromCharCode(i);
        }
        return btoa(hashString).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");
    }
    const codeVerifier = randomString(128);
    const hash = await digestMessage(codeVerifier);
    const viewHash = new Uint8Array(hash);
    const codeChallenge = base64url(viewHash);
    const state = randomString(32);
    localStorage.setItem('handle_verifier', codeVerifier);
    localStorage.setItem('handle_state', state);

    const requestURL = (
        "https://student.sbhs.net.au/api/authorize?" +
        "client_id=" + appId + "&" +
        "response_type=code&" +
        "state=" + state + "&" +
        "code_challenge=" + codeChallenge + "&" +
        "code_challenge_method=S256&" +
        "scope=all-ro&" +
        "redirect_uri=" + redirect
    );

    window.location.assign(requestURL);

}
//redirects to login url

export async function stateManager() {
    const params = new URLSearchParams(window.location.href.toString().split("?")[1]);
    const tokenAge = localStorage.getItem('access_age');
    const token = localStorage.getItem('handle_access');
    // console.log("token age: " + Number(tokenAge));
    // console.log("current time: " + Date.now());
    let response;
    if (params.has('code')) {
        response = await requestToken();
        if (response === false) {
            return "askToLogin";
        }
        else {
            return "success";
        }
    }
    else if (tokenAge !== "" && (Date.now() <= (Number(tokenAge) + 3500000))) {
        //check for token - if no token then show login message
        if (token !== "") {
            return "success";
        }
        else {
            return "askToLogin";
        }
    }
    else {
        await requestCode();
        return "redirect";
    }
}
//returns success or askToLogin

export async function fetchData(ask, src) {
    if (src === "sch") {
        const requestUrl = "https://forward.genericbells.workers.dev/?ask=" + ask;
        // const token = "Bearer " + localStorage.getItem('handle_access');
        const token = "Bearer abcdefg";

        let res = await fetch(requestUrl, {headers: new Headers({'Authorization': token})});
        let i = 0;
        while (i < 1) {
            if (!res.ok) {
                res = await fetch(requestUrl, {headers: new Headers({'Authorization': token})});
            }
            i++;
        }
        if (!res.ok) {
            localStorage.removeItem('handle_access');
            return false;
        }
        else {
            const output = res.json();
            // console.log(output);
            return output;
        }
    }
    else if (src === "random") {
        const callables = {
            tt: 'timetable/timetable.json',
            idn: 'details/userinfo.json',
            wk: 'timetable/bells.json',
            dtt: 'timetable/daytimetable.json'
        };
        if (ask === 'wk') {
            let res = await fetch('https://student.sbhs.net.au/api/timetable/bells.json');
            return res.json();
        }
        const requestUrl = "https://sbhs-random-data.profsmart.repl.co/api/";
        let res = await fetch(requestUrl + callables[ask]);
        return res.json();
    }
}
//returns false or json data