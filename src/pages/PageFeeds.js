import React, { useState } from 'react';
import {fetchData} from "../apiFetcher";


export default function PageFeeds(props) {

    let feedScroll = [];
    // get localstorage feeds data
        //check if date is today
    //get live data

    //format to output

    //save to localstorage


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