

export const Version = "v18";

export function checkVersion(obj, version = Version) {
    let data = localStorage.getItem(obj);
    // console.log(obj);
    // console.log(data);
    // console.log(version);
    if (data === null) {
        return true;
    }
    data = JSON.parse(data);

    if (data.hasOwnProperty('verCon') === false) {
        console.log("Cleared data -1");
        localStorage.clear();
        sessionStorage.clear();
    }
    if (data['verCon'] !== version) {
        console.log("Cleared data -2");
        localStorage.removeItem(obj);
        sessionStorage.removeItem(obj);
    }
    return true;
}

export function passItem(name, type = 'l') {
    checkVersion(name);
    let data;
    if (type === 'l') {
        data = localStorage.getItem(name);
    }
    else if (type === 's') {
        data = sessionStorage.getItem(name);
    }
    if (data === null) {
        return null;
    }
    data = JSON.parse(data);
    delete data.verCon;
    if (data.hasOwnProperty('type') && data.hasOwnProperty('stuff')) {
        if (data.type === "array") {
            return data.stuff;
        }
    }
    return data;
}

export function saveItem(name, obj, type = 'l') {
    let data;

    if (Array.isArray(obj)) {
        data = {"stuff": obj, "type": "array"};
    }
    else {
        data = obj;
    }

    data.verCon = Version;
    data = JSON.stringify(data);

    if (type === 'l') {
        localStorage.setItem(name, data);
    }
    else if (type === 's') {
        sessionStorage.setItem(name, data);
    }

    return true;
}

export function passStr(name, type = 'l') {
    checkVersion(name);
    let data;
    if (type === 'l') {
        data = localStorage.getItem(name);
    }
    else if (type === 's') {
        data = sessionStorage.getItem(name);
    }
    if (data === null) {
        return null;
    }
    data = JSON.parse(data);
    return data.stuff;
}

export function saveStr(name, obj, type = 'l') {

    let data = {stuff: obj};
    data.verCon = Version;
    data = JSON.stringify(data);

    if (type === 'l') {
        localStorage.setItem(name, data);
    }
    else if (type === 's') {
        sessionStorage.setItem(name, data);
    }

    return true;
}

export function clog(item, name="") {
    console.log(name + ": " + JSON.stringify(item));

}