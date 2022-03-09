import {passItem, saveItem} from "./version";

//TODO: PREFLIGHT: server data

const siteURL = encodeURIComponent('https://genericbells.pages.dev');
const useAppId = "genericbells10";
const serverURL = "https://forward.genericbells.workers.dev/";
const tokenServerURL = "https://refresh.genericbells.workers.dev";

const refreshValidity = 90 * 24 * 60 * 60 * 1000 - 10000;
const tokenValidity = 60 * 60 * 1000 - 10000;

// const siteURL = encodeURIComponent('https://genericbellstesting3.pages.dev');
// const useAppId = "genericbellstesting3";
// const serverURL = "https://forward2.genericbells.workers.dev/";
// const tokenServerURL = "https://refresh2.genericbells.workers.dev";

export function getWeekNum(date, mode='millis') {
    let dateVal;
    let today;
    if (mode === 'string') {
        //date: YYYY-MM-DD
        dateVal = date.split("-");
        today = new Date(Number(dateVal[0]), Number(dateVal[1]) - 1, Number(dateVal[2]));
    }
    else if (mode === 'millis') {
        today = new Date(date);
    }

    const year = today.getFullYear();

    let i = 1;
    while (i <= 7) {
        if ((new Date(Number(year), 0, i).getDay()) === 1) {
            break;
        }
        i++;
    }
    const week1 = (new Date(Number(year), 0, i)).getTime();

    const now = today.getTime();

    const nWeeks = Math.floor((now - week1) / (7*24*60*60*1000));

    if (now < week1) {
        return 0;
    }
    else {
        return nWeeks + 1;
    }


}

export async function requestRefreshToken() {
    const timestamp = Number(localStorage.getItem("refresh_timestamp"));
    const refresh = localStorage.getItem("handle_refresh");
    if (timestamp == null || refresh == null) {
        return false;
    }
    if (Date.now() < (timestamp + refreshValidity)) {
        const requestBody = {
            'grant_type': 'refresh_token',
            'client_id': useAppId,
            'refresh_token': refresh
        };

        const requestURL = (
            tokenServerURL
        );

        let response = await fetch(requestURL, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(requestBody)}).catch(e => console.log(e));
        if (!response.ok) {
            console.log("Error refreshing tokens. -1");
            response = await fetch(requestURL, {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(requestBody)}).catch(e => console.log(e));
            if (!response.ok) {
                console.log('Error refreshing tokens. -2');
                return false;
            }
        }
        const tokens = await response.json();
        // console.log(tokens);
        localStorage.setItem('handle_access', tokens['access_token']);
        localStorage.setItem('access_timestamp', Date.now().toString());
        if (tokens.hasOwnProperty('refresh_token')) {
            localStorage.setItem('handle_refresh', tokens['refresh_token']);
            localStorage.setItem('refresh_timestamp', Date.now().toString());
        }

        return true;
    }
    else {
        return false;
    }
 }

export async function requestToken() {
    const redirect = siteURL;
    const appId = useAppId;
    localStorage.removeItem('access_timestamp');
    localStorage.removeItem('handle_access');
    localStorage.removeItem('refresh_timestamp');
    localStorage.removeItem('handle_refresh');
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
        body: requestBody}).catch(e => console.log(e));
    if (!response.ok) {
        console.log("Error fetching tokens. -1");
        response = await fetch(requestURL, {
            method: "POST",
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: requestBody}).catch(e => console.log(e));
        if (!response.ok) {
            console.log('Error fetching tokens. -2');
            return false;
        }
    }
    let tokens = await response.json();
    // console.log(tokens);
    if (tokens) {
        localStorage.setItem('handle_access', tokens['access_token']);
        localStorage.setItem('access_timestamp', Date.now().toString());
        localStorage.setItem('handle_refresh', tokens['refresh_token']);
        localStorage.setItem('refresh_timestamp', Date.now().toString());
    }

    localStorage.removeItem('handle_state');
    localStorage.removeItem('handle_verifier');


    return true;
}
//returns false for problems, true for ok

export async function requestCode() {
    const redirect = siteURL;
    const appId = useAppId;
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
        let hash;
        await crypto.subtle.digest('SHA-256', data).then(res => hash=res).catch(e => console.log(e));
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
    const accessTokenTime = localStorage.getItem('access_timestamp');
    const accessToken = localStorage.getItem('handle_access');
    const refreshTokenTime = localStorage.getItem('refresh_timestamp');
    const justRedirected = localStorage.getItem("just_redirected");

    const online = window.navigator.onLine;
    if (!online) {
        return "offline";
    }

    if (params.has('code')) {
        localStorage.removeItem("just_redirected");
        let response = false;
        await requestToken().then(res => response=res).catch(e => console.log(e));
        if (response === true) {
            return "success";
        }
        else {
            return "askToLogin";
        }
    }
    else if (accessTokenTime !== null && (Date.now() <= (Number(accessTokenTime) + tokenValidity))) {
        //check for token - if no token then show login message
        if (accessToken !== "") {
            return "success";
        }
        else {
            return "askToLogin";
        }
    }
    else if (refreshTokenTime !== null && (Date.now() <= (Number(refreshTokenTime) + refreshValidity))) {
        let tryRefresh;
        await requestRefreshToken().then(res => tryRefresh=res).catch(e => console.log(e));
        if (tryRefresh === true) {
            return "success";
        }
        else {
            localStorage.removeItem("handle_refresh");
            localStorage.removeItem("refresh_timestamp");
            return "askToLogin";
        }

    }
    else if (justRedirected !== null) {
        return "askToLogin";
    }
    else {
        localStorage.setItem("just_redirected", "yes");
        await requestCode().catch(e => console.log(e));
        return "redirect";
    }
}
//returns success or askToLogin

export async function fetchData(ask, src = 'direct', auth=true) {
    // wk = "calendar/days"
    const callables = {
        tt: 'timetable/timetable.json',
        idn: 'details/userinfo.json',
        wk: 'timetable/bells.json',
        dtt: 'timetable/daytimetable.json',
        note: 'dailynews/list.json'
    };

    let requestUrl;
    let token;
    if (auth) {
        token = localStorage.getItem('handle_access');
        if (token === null) {
            return false;
        }
        else {
            token = "Bearer " + token;
        }
    }
    if (src === "direct") {
        requestUrl = "https://student.sbhs.net.au/api/" + callables[ask];
    }
    else if (src === "forward") {
        requestUrl = serverURL + "?ask=" + ask;
    }
    // console.log(requestUrl);
    let res = false;
    await fetch(requestUrl, {headers: new Headers({'Authorization': token})}).then(r => res=r).catch(e => console.log(e));
    let i = 0;
    while (i < 1) {
        if (!res.ok) {
            await fetch(requestUrl, {headers: new Headers({'Authorization': token})}).then(r => res=r).catch(e => console.log(e));
        }
        i++;
    }
    if (!res.ok) {
        return false;
    }
    else {
        return res.json();
    }
}
//returns false or json data

export async function getData(getId=true) {
    let data = {};

    await stateManager().then(state => data.dataState=state).catch(e => {console.log(e); data.dataState="askToLogin"});
    let userId = !getId;
    let dtt = false;
    let tt = false;
    let weekData = false;
    let note = false;
    if (data.dataState === 'success') {
        let checkAllGood = true;
        const source = "forward";
        if (getId) {
            await Promise.all([
                fetchData('dtt', source).then(res => dtt = res)
                    .then(() => dtt ? data.dtt = dtt : checkAllGood = false),
                fetchData('tt', source).then(res => tt = res)
                    .then(() => tt ? data.tt = tt : checkAllGood = false),
                fetchData('note', source).then(res => note = res)
                    .then(() => note ? data.feeds = note : checkAllGood = false),
                fetchData('wk', source).then(res => weekData = res)
                    .then(() => weekData ? data.dayName = (weekData.day + " " + weekData.week + weekData.weekType) : checkAllGood = false),
                fetchData('idn', source).then(res => userId = res.studentId)
                    .then(() => userId ? data.userId = userId : checkAllGood = false)
            ]).catch(e => console.log(e));
        }
        else {
            await Promise.all([
                fetchData('dtt', source).then(res => dtt = res)
                    .then(() => dtt ? data.dtt = dtt : checkAllGood = false),
                fetchData('tt', source).then(res => tt = res)
                    .then(() => tt ? data.tt = tt : checkAllGood = false),
                fetchData('note', source).then(res => note = res)
                    .then(() => note ? data.feeds = note : checkAllGood = false),
                fetchData('wk', source).then(res => weekData = res)
                    .then(() => weekData ? data.dayName = (weekData.day + " " + weekData.week + weekData.weekType) : checkAllGood = false)
            ]).catch(e => console.log(e));
        }

        if (weekData) {
            let weekNo = getWeekNum(weekData.date, 'string');
            let weekCode = weekData.weekType;
            let weekCodeNo;
            if (weekCode === 'A') {
                weekCodeNo = 0;
            }
            else if (weekCode === 'B') {
                weekCodeNo = 1;
            }
            else if (weekCode === 'C') {
                weekCodeNo = 2;
            }
            data.sync = {weekNo: weekNo, weekDiff: weekCodeNo};
        }

        if (checkAllGood) {
            let timestamp = dtt.date.split("-");
            let timestamp2 = new Date(Number(timestamp[0]), Number(timestamp[1]) - 1, Number(timestamp[2]), 16, 0, 0);
            data.timestamp = timestamp2.getTime().toString();

            let storedSettings = passItem('feedSettings');
            if (storedSettings === null) {
                saveItem('feedSettings', {seeOnlyMyYear: true, year: tt.student.year});
            }
        }
        else {
            console.log("Error fetching data.");
            data.dataState = 'offline';
        }
    }
    return data;
}


