import React, { useState } from 'react';
import {fetchData} from "../apiFetcher";
import {passItem, passStr, saveItem} from "../version";
import FeedItem from "../components/FeedItem";


export default function PageFeeds(props) {
    // let SAMPLEDATA;
    // saveItem('dailyNotices', SAMPLEDATA);


    let feedScroll = [];
    let data = false;
    // get localstorage feeds data
    let storedData = passItem('dailyNotices');
    let dateString = (storedData.dayInfo.date).split("-");
    let timestamp = new Date(Number(dateString[0]), Number(dateString[1]) - 1, Number(dateString[2]), 23, 59, 59, 999);

    if (Date.now() <= timestamp.getTime()) {
        data = storedData.notices;
    }
    //get live data
    if (props.dataState === 'success') {
        let newData = fetchData('note');
        if (!newData) {
            data = newData.notices;
            console.log(data);
            saveItem('dailyNotices', newData);
        }
    }
    let feedSettings = {seeOnlyMyYear: false, year: ""};
    let storedSettings = passItem('feedSettings');
    if (storedSettings !== null) {
        feedSettings = Object.assign(feedSettings, storedSettings);
    }

    function compareFn(a, b) {
        return ((b.relativeWeight + b.isMeeting) - (a.relativeWeight + a.isMeeting));
    }

    console.log(data);
    //format to output
    if (Array.isArray(data)) {
        data.sort(compareFn);

        let i = 0;
        while (i < data.length) {
            if (feedSettings.seeOnlyMyYear === false || data[i].years.includes(feedSettings.year)) {
                let message = data[i];
                feedScroll.push(
                    <FeedItem
                        data={message}
                        date={storedData.dayInfo.date}
                        key={i.toString()}
                        id={i.toString()}
                    />
                );
            }
            i++;
        }
    }

    if (feedScroll.length === 0) {
        feedScroll.push(
          <div className="group">
              <h3 className="settings" key={"noNews"}>No news to show for today.</h3>
          </div>
        );
    }

    const output = (
        <div className="page__feeds page__prop">
            <h1>Notices</h1>
            <div className="feeds__container ">
                {feedScroll}
            </div>
        </div>
    );



    return output;
}