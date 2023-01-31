import {passItem, passStr, saveItem, saveStr} from "./version";


const lightVariables = {
    '--nav-background': 'white',
    '--page-background': '#eeeeee',
    '--nav-light': '#e0e0e0',
    '--glow': 'rgba(0, 0, 0, 0.5)',
    '--glow2': 'rgba(0, 0, 0, 0.15)',
    '--glow3': 'rgba(0, 0, 0, 0.25)',
    '--text0': 'black',
    '--text1': 'black',
    '--text2': '#222222',
    '--text3': '#888888',
    '--text4': '#333333',
    '--text10': 'white',
    '--ui-green': '#92c748',
    '--ui-yellow': '#ffc633',
    '--ui-grey0': '#333333',
    '--ui-grey1': '#d0d0d0',
    '--ui-grey2': '#d0d0d0',
    '--card': 'white',
    '--card-outline': '#d0d0d0',
    '--timetable-light': '#eeeeee',
    '--timetable-nonselected': '#d0d0d0',
    '--button-front': 'white',
    '--button-back': '#333333',
    '--input-focus': '#333333',
    '--link-colour': '#0D4C73',
    '--shadow-length-1-2': '1px'
};

const darkVariables = {
    '--nav-background': '#222527',
    '--page-background': '#151515',
    '--nav-light': '#3e4347',
    '--glow': 'rgba(0, 0, 0, 0.5)',
    '--glow2': 'rgba(0, 0, 0, 0.5)',
    '--glow3': 'rgba(0, 0, 0, 0.5)',
    '--text0': 'white',
    '--text1': '#dddddd',
    '--text2': '#dddddd',
    '--text3': '#dddddd',
    '--text4': 'white',
    '--text10': 'black',
    '--ui-green': '#95C059',
    '--ui-yellow': '#E8BD31',
    '--ui-grey0': '#dddddd',
    '--ui-grey1': '#cccccc',
    '--ui-grey2': '#dddddd',
    '--card': '#303032',
    '--card-outline': '#151515',
    '--timetable-light': '#4c4c4f',
    '--timetable-nonselected': '#4c4c4f',
    '--button-front': '#333333',
    '--button-back': '#dddddd',
    '--input-focus': '#95c059',
    '--link-colour': '#61B0B5',
    '--shadow-length-1-2': '2px'
};

export const darkColours = [
    {hex: "#95C059", isDark: false},
    {hex: "#61B0B5", isDark: false},
    {hex: "#E8BD31", isDark: false},
    {hex: "#EBADB9", isDark: false},
    {hex: "#2975A3", isDark: true},
    {hex: "#CD4B37", isDark: true},
    {hex: "#8E58A7", isDark: true},
    {hex: "#3E8131", isDark: true},
    {hex: "#B9467F", isDark: true},
    {hex: "#BEB8E0", isDark: false},
    {hex: "#C1895C", isDark: false},
    {hex: "#DF8D20", isDark: false},
    {hex: "#A0A0A0", isDark: true},
    {hex: "#E5E5E5", isDark: false}
];

export const lightColours = [
    {hex: "#97CB4D", isDark: false},
    {hex: "#57BBC1", isDark: false},
    {hex: "#F4C325", isDark: false},
    {hex: "#F0A8B6", isDark: false},
    {hex: "#0D4C73", isDark: true},
    {hex: "#A51221", isDark: true},
    {hex: "#582E6B", isDark: true},
    {hex: "#28631D", isDark: true},
    {hex: "#9E2E66", isDark: true},
    {hex: "#D5B5E6", isDark: false},
    {hex: "#C18A5C", isDark: false},
    {hex: "#F49B26", isDark: false},
    {hex: "#333333", isDark: true},
    {hex: "#CCCCCC", isDark: false}
];




export function swapTheme() {
    let currentTheme = passStr('isDarkMode');
    if (currentTheme) {
        setTheme('light');
    }
    else {
        setTheme('dark');
    }
}

export function setTheme(input) {
    let isDark = (input === 'dark');
    let source;
    let root = document.documentElement;
    if (isDark) {
        source = darkVariables;
    }
    else {
        source = lightVariables;
    }
    for (const prop in source) {
        root.style.setProperty(prop, source[prop]);
    }
    saveStr("isDarkMode", isDark);

    let settings = passItem('displaySettings');
    if (settings !== null) {
        for (const subjectId in settings) {
            let colorPosition = -1;
            if (input === 'dark') {
                colorPosition = lightColours.findIndex(
                    (element) => element.hex === settings[subjectId].colour.hex);
                if (colorPosition >= 0) {
                    settings[subjectId].colour = {...darkColours[colorPosition]};
                }
            }
            else if (input === 'light') {
                colorPosition = darkColours.findIndex(
                    (element) => element.hex === settings[subjectId].colour.hex);
                if (colorPosition >= 0) {
                    settings[subjectId].colour = {...lightColours[colorPosition]};
                }
            }
        }
    }
    saveItem('displaySettings', {...settings});
}

export function checkTheme() {
    const params = new URLSearchParams(window.location.href.toString().split("?")[1]);
    if (params.has('theme')) {
        let theme = params.get('theme');
        if (theme === "dark") {
            setTheme('dark');
            saveStr('isDarkMode', true);
        }
        else if (theme === "light") {
            setTheme('light');
            saveStr('isDarkMode', false);
        }

    }

    let mode = passStr('isDarkMode');
    if (mode === null) {
        setTheme('light');
        saveStr('isDarkMode', false);
    }
    else if (mode === false) {
        setTheme('light');
    }
    else if (mode === true) {
        setTheme('dark');
    }
}