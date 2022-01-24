import React, { useState } from 'react';
import ClassInfo from "../components/ClassInfo";
import {passStr, saveStr, passItem, saveItem} from "../version";
import { ReactComponent as Logo } from "../assets/favicon3.svg";


export default function PageSettings(props) {


    /**
     * rawName
     * displayName
     * colour: hex, isDark
     * displayCode
     *
     * **/
    let classSettings = passItem('displaySettings');
    let classInfos = [];

    function reportInput(id, type, val) {
        classSettings[id][type] = val;
        saveItem("displaySettings", classSettings);
    }

    if (classSettings !== null) {
        let i = 0;
        for (const subject in classSettings) {
            // console.log(subject);
            classInfos.push(
                <ClassInfo reportInput={reportInput} obj={classSettings[subject]} key={i.toString()} id={i.toString()} />
            );
            i++;
        }
    }

    function logout(e) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const [cardsExpanded, setCardsExpanded] = useState(passStr('set_cards_expanded')==="yes");
    const [feedsExpanded, setFeedsExpanded] = useState(passStr('set_feeds_expanded')==='yes');

    function handleCardsToggle(side) {
        if (!side) {
            saveStr('set_cards_expanded', '');
            setCardsExpanded(side);
        }
        else {
            saveStr('set_cards_expanded', 'yes');
            setCardsExpanded(side);
        }

        return true;
    }

    function handleFeedsToggle(side) {
        if (!side) {
            saveStr('set_feeds_expanded', '');
            setFeedsExpanded(false);
        }
        else {
            saveStr('set_feeds_expanded', 'yes');
            setFeedsExpanded(true);
        }
    }

    function chooseFeedYear(e) {
        if (e.target.value === "all") {
            saveItem({seeOnlyMyYear: false, year: ""});
        }
        else {
            saveItem("feedSettings", {seeOnlyMyYear: true, year: e.target.value});
        }
    }
    const feedSettings = passItem('feedSettings');
    let savedFeedYear = "all";
    if (feedSettings !== null) {
        savedFeedYear = (feedSettings.seeOnlyMyYear ? feedSettings.year : "all");
    }

    const output = (
        <div className="page__settings page__prop">
            <h1>Settings</h1>
            <div className="group" id="banner">
                {/*<img className="banner__image" width="100px" src={logo} alt="logo" />*/}
                <Logo style={{width: '100px'}} />
            </div>
            <div className="group">
                <h2 className="settings">Change colours & names</h2>
                <p className="settings">
                    Choose a colour for each subject. Long names are used on the daily
                    timetable. Short names are used on the full timetable (max. 4 letters).
                </p>
                {classInfos}
            </div>
            <div className="group">
                <h2 className="settings">Period display style</h2>
                <p className="settings">
                    Click on the cards for each period to show details like teacher name & time.
                    The button below sets them to be expanded by default.
                </p>
                <div className="toggle">
                    <div className={"toggle__left toggle__side" + (!cardsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleCardsToggle(false)}>
                        collapse all
                    </div>
                    <div className={"toggle__right toggle__side" + (cardsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleCardsToggle(true)}>
                        expand all
                    </div>
                </div>
                <div className={"period page__bells__row " + (cardsExpanded ? "period--maximised" : "period--minimised")} onClick={() => handleCardsToggle(!cardsExpanded)}>
                    <div className="period__top">
                        <div className="period__icon" style={{
                            backgroundColor: '#d0d0d0',
                            color: ('black')
                        }}>
                            1
                        </div>
                        <div className="period__name">
                            Click Me
                        </div>
                        <div className= {"period__room"}>
                            000
                        </div>
                    </div>
                    <div className={"period__details " + (cardsExpanded ? "period__details--expanded" : "period__details--closed")}>
                        <div className="period__details__item">time</div>
                        <div className="period__details__item">teacher</div>
                    </div>
                </div>
            </div>
            <div className="group">
                <h2 className="settings">Notices display style</h2>
                <p className="settings">Click on each notice to expand and show the full text.</p>
                <div className="toggle">
                    <div className={"toggle__left toggle__side" + (!feedsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleFeedsToggle(false)}>
                        collapse all
                    </div>
                    <div className={"toggle__right toggle__side" + (feedsExpanded ? " toggle--selected" : "")}
                         onClick={() => handleFeedsToggle(true)}>
                        expand all
                    </div>
                </div>
                <div
                    className="feedItem"
                    onClick={() => handleFeedsToggle(!feedsExpanded)}
                >
                    <h2 className="feedItem__title">Click me</h2>
                    <div className="feedItem__metadataRow settings">
                        <div className="feedItem__meetingTag">
                            <div className="feedItem__metadata feedItem__metadata__meeting">Meeting: </div>
                            <h6 className="feedItem__metadata feedItem__metadata__meeting settings">Time</h6>
                            <h6 className="feedItem__metadata feedItem__metadata__meeting settings">Location</h6>
                        </div>
                        <h6 className="feedItem__metadata">Teacher</h6>
                        <div className="feedItem__metadata">Student years</div>
                    </div>
                    <p
                        className={"settings feedItem__body " + (feedsExpanded ? "feedItem__body--expanded" : "feedItem__body--minimised")}
                    >
                        Click to expand and see the full message. <br /> This is the main body of the message <br />
                        Click again to minimise the message.
                    </p>
                </div>
                <div className="dropdown">
                    <h3 className="dropdown__label settings" style={{fontWeight: 500}}>Only show notices for year: </h3>
                    <select name="yearsList" id="yearsList" onChange={chooseFeedYear} defaultValue={savedFeedYear} className="dropdown__selector">
                        <option value="all">all</option>
                        <option value="7" >7</option>
                        <option value="8" >8</option>
                        <option value="9" >9</option>
                        <option value="10" >10</option>
                        <option value="11" >11</option>
                        <option value="12" >12</option>
                    </select>
                </div>
            </div>

            <div className="group">
                <button className="settings button" onClick={logout}>Logout</button>
                <p className="settings" style={{"marginTop": "0px"}}>
                    This will clear all user data that we store on your computer. <br />
                    <span style={{fontWeight: 500}}>Note: Your settings will be deleted.</span>
                </p>
            </div>
            <div className="group">
                <h2 className="settings">Help</h2>
                <h6 className="settings">Show teacher name & classes</h6>
                <p className="settings">Click on each period on the home page to see details.</p>

            </div>
            <div className="group">
                <h2 className="settings">About Generic Bells</h2>
                <p className="settings">This app aims to show your timetable in a concise, friendly and reliable way.</p>
                <p className="settings">Source code can be found on Github here.</p>
                <p className="settings"><a href="https://github.com/mintcarrotkeys/generic-bells">mintcarrotkeys/generic-bells</a></p>
                <p className="settings"><br /></p>
                <h4 className="settings">version 1.2.1</h4>
                <p className="settings">
                    This is a beta release, meaning the software will have bugs and unforeseen problems.
                    Use at your own risk. Don't enter any sensitive or important data into the app.
                </p>
                <h6 className="settings">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </h6>
            </div>
            <div className="group">
                <h1 className="settings">Sample text</h1>
                <h2 className="settings">Heading 2</h2>
                <h3 className="settings">Heading 3</h3>
                <h4 className="settings">Heading 4</h4>
                <h5 className="settings">Heading 5</h5>
                <h6 className="settings">Heading 6</h6>
                <p className="settings">Body text</p>

            </div>
        </div>
    );



    return output;
}