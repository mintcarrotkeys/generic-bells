import React, { useState } from 'react';
import {passItem, saveItem} from "../version";
import FeedItem from "../components/FeedItem";
import Offline from "../components/Offline";
import Loading from "../components/Loading";


export default function PageFeeds(props) {
    /**
     * data
     * dataState
     *
     * **/
    let feedScroll = [];
    let data = false;

    if (props.data.hasOwnProperty("notices")) {
        data = props.data.notices;
    }

    const [feedSettings, setFeedSettings] = useState(initFeedSettings);

    function initFeedSettings() {
        let seeAll = {seeOnlyMyYear: false, year: ""};
        let storedSettings = passItem('feedSettings');
        if (storedSettings !== null) {
            return storedSettings;
        }
        else {
            return seeAll;
        }
    }

    // console.log(props.data.dayInfo.date);
    // console.log(data);

    //format to output
    function compareFn(a, b) {
        let B = b.relativeWeight + b.isMeeting + (b.meetingDate===props.data.dayInfo.date ? 1 : 0);
        let A = a.relativeWeight + a.isMeeting + (a.meetingDate===props.data.dayInfo.date ? 1 : 0);
        return (B- A);
    }

    if (Array.isArray(data)) {
        data.sort(compareFn);

        let i = 0;
        while (i < data.length) {
            if (feedSettings.seeOnlyMyYear === false || data[i].years.includes(feedSettings.year)) {
                let message = data[i];
                feedScroll.push(
                    <FeedItem
                        data={message}
                        date={props.data.dayInfo.date}
                        key={i.toString()}
                    />
                );
            }
            i++;
        }
    }

    if (feedScroll.length === 0) {
        feedScroll.push(
            <div className="group" key={-1}>
                <h3 className="settings">No school notices to show for today.</h3>
            </div>
        );
    }

    function chooseFeedYear(e) {
        if (e.target.value === "all") {
            saveItem("feedSettings", {seeOnlyMyYear: false, year: ""});
            setFeedSettings({seeOnlyMyYear: false, year: ""});
        }
        else {
            saveItem("feedSettings", {seeOnlyMyYear: true, year: e.target.value});
            setFeedSettings({seeOnlyMyYear: true, year: e.target.value});
        }
    }

    let savedFeedYear = "all";
    if (feedSettings.seeOnlyMyYear) {
        savedFeedYear = feedSettings.year;
    }

    const output = (
        <div className="page__feeds page__prop">
            {props.dataState==='offline' ? <Offline /> : ""}
            {props.dataState==='loading' ? <Loading /> : ""}
            <h1 className="bigHeading">Notices</h1>
            <div className="group">
                <div className="change-feed-year">
                    <h5>Show notices for year: </h5>
                    <div>
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
            </div>
            <div className="feeds__container ">
                {feedScroll}
            </div>
        </div>
    );

    return output;
}