import React, { useState } from 'react';
import { passItem } from "../version";
import FeedItem from "../components/FeedItem";
import Offline from "../components/Offline";


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

    let feedSettings = {seeOnlyMyYear: false, year: ""};
    let storedSettings = passItem('feedSettings');
    if (storedSettings !== null) {
        feedSettings = Object.assign(feedSettings, storedSettings);
    }

    //format to output
    function compareFn(a, b) {
        return ((b.relativeWeight + b.isMeeting) - (a.relativeWeight + a.isMeeting));
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

    const output = (
        <div className="page__feeds page__prop">
            {props.isOffline ? <Offline /> : ""}
            <h1>Notices</h1>
            <div className="feeds__container ">
                {feedScroll}
            </div>
        </div>
    );

    return output;
}