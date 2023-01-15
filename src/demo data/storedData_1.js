import React from 'react';
import FeedItem from "../components/FeedItem";

//Sample data for demo


export const storedData = {
  "dataState": "offline",
  "userId": "441234567",
  "dayName": "Thursday C",
  "tt": {
    "student": {
      "surname": "Citizen",
      "givenname": "John",
      "BoSNumber": "12345678",
      "studentId": "441234567"
    },
    "subjects": [
      {
        "title": "Mathematics Advanced",
        "shortTitle": "MAA A2",
        "teacher": "",
        "subject": "Mathematics Advanced X2",
        "fullTeacher": "J Jones",
      },
      {
        "title": "Physics",
        "shortTitle": "PHY B5",
        "teacher": "",
        "subject": "Physics Yr12",
        "fullTeacher": "E Smith",
      },
      {
        "title": "English Advanced",
        "shortTitle": "ENA A1",
        "teacher": "",
        "subject": "English Advanced Yr12",
        "fullTeacher": "A Brown",
      },
      {
        "title": "Sport",
        "shortTitle": "SP 12",
        "teacher": null,
        "subject": "Sport Yr12",
        "fullTeacher": "",
      },
      {
        "title": "Mathematics Extension 2",
        "shortTitle": "MX2 A7",
        "teacher": "",
        "subject": "Mathematics Extension 2 X2",
        "fullTeacher": "J Jones",
      },
      {
        "title": "Mathematics Extension 1",
        "shortTitle": "MAX A6",
        "teacher": "",
        "subject": "Mathematics Extension 1 X2",
        "fullTeacher": "J Jones",
      },
      {
        "title": "Chemistry",
        "shortTitle": "CHE A3",
        "teacher": "",
        "subject": "Chemistry HSC",
        "fullTeacher": "M Taylor",
      },
      {
        "title": "Design & Technology",
        "shortTitle": "DAT",
        "teacher": "",
        "subject": "Design & Technology HSC",
        "fullTeacher": "H Lee",
      }
    ],
    "days": {
      "1": {
        "dayname": "MonA",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "1": {
            "title": "MAX A6",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "303",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "203",
            "fullTeacher": "A Brown"
          },
          "5": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          }
        },
        "dayNumber": "1"
      },
      "2": {
        "dayname": "TueA",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "2": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "303",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "5": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          }
        },
        "dayNumber": "2"
      },
      "3": {
        "dayname": "WedA",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "0": {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "1": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "209",
            "fullTeacher": "A Brown"
          },
          "2": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "3": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          "4": {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          },
          "5": {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          }
        },
        "dayNumber": "3"
      },
      "4": {
        "dayname": "ThuA",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "0": {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "1": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "2": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "209",
            "fullTeacher": "A Brown"
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "303",
            "fullTeacher": "M Taylor"
          }
        },
        "dayNumber": "4"
      },
      "5": {
        "dayname": "FriA",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "1": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "3": {
            "title": "MAX A6",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "4": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "701",
            "fullTeacher": "M Taylor"
          },
          "5": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "209",
            "fullTeacher": "A Brown"
          }
        },
        "dayNumber": "5"
      },
      "6": {
        "dayname": "MonB",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "1": {
            "title": "MAX A6",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "904",
            "fullTeacher": "A Brown"
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "301",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          "5": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          }
        },
        "dayNumber": "6"
      },
      "7": {
        "dayname": "TueB",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "1": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "2": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "601",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "205",
            "fullTeacher": "E Smith"
          }
        },
        "dayNumber": "7"
      },
      "8": {
        "dayname": "WedB",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": [
          {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "701",
            "fullTeacher": "M Taylor"
          },
          {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "209",
            "fullTeacher": "A Brown"
          },
          {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          },
          {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          }
        ],
        "dayNumber": "8"
      },
      "9": {
        "dayname": "ThuB",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "0": {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "1": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "2": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "204",
            "fullTeacher": "A Brown"
          },
          "3": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          }
        },
        "dayNumber": "9"
      },
      "10": {
        "dayname": "FriB",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "1": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "203",
            "fullTeacher": "A Brown"
          },
          "3": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "304",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "5": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          }
        },
        "dayNumber": "10"
      },
      "11": {
        "dayname": "MonC",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "1": {
            "title": "MAX A6",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "301",
            "fullTeacher": "M Taylor"
          },
          "3": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          "4": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "5": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "102",
            "fullTeacher": "A Brown"
          }
        },
        "dayNumber": "11"
      },
      "12": {
        "dayname": "TueC",
        "routine": "0,RC,1,2,R,3,4,MTL1,MTL2,5",
        "periods": {
          "1": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "2": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "303",
            "fullTeacher": "M Taylor"
          },
          "4": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "5": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          }
        },
        "dayNumber": "12"
      },
      "13": {
        "dayname": "WedC",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "0": {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "3": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "209",
            "fullTeacher": "A Brown"
          },
          "4": {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          },
          "5": {
            "title": "SP 12",
            "teacher": null,
            "room": null,
            "fullTeacher": ""
          }
        },
        "dayNumber": "13"
      },
      "14": {
        "dayname": "ThuC",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "0": {
            "title": "MX2 A7",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "2": {
            "title": "ENA A1",
            "teacher": "BROA",
            "room": "204",
            "fullTeacher": "A Brown"
          },
          "3": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "4": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "5": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          }
        },
        "dayNumber": "14"
      },
      "15": {
        "dayname": "FriC",
        "routine": "0,RC,1,2,R,3,WFL1,WFL2,4,5",
        "periods": {
          "1": {
            "title": "CHE A3",
            "teacher": "TAYM",
            "room": "303",
            "fullTeacher": "M Taylor"
          },
          "2": {
            "title": "PHY B5",
            "teacher": "SMIE",
            "room": "701",
            "fullTeacher": "E Smith"
          },
          "3": {
            "title": "DAT",
            "teacher": "LEEH",
            "room": "501",
            "fullTeacher": "H Lee",
          },
          "4": {
            "title": "MAA A2",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          },
          "5": {
            "title": "MAX A6",
            "teacher": "JONJ",
            "room": "104",
            "fullTeacher": "J Jones"
          }
        },
        "dayNumber": "15"
      }
    }
  },
  "dtt": {},
  "feeds": {
    "date": 1661569000,
    "dayInfo": {
      "date": "2022-02-02",
      "term": 1,
      "week": 1,
      "weekType": "C",
      "events": null,
      "dayNumber": "13",
      "dayName": "WedC"
    },
    "notices": []
  },
  "sync": {
    "weekNo": 35,
    "weekDiff": 2
  },
  "timestamp": "1662012000000",
  "verCon": "v18"
}


export const displaySettings = {
  "MAA A2": {
    "displayName": "Mathematics",
    "colour": {"hex": "#97CB4D", "isDark": false},
    "displayCode": "MAT",
    "rawName": "Mathematics Advanced",
    "refId": "MAA A2",
    "defaultName": "Mathematics Advanced"
  },
  "PHY B5": {
    "displayName": "Physics",
    "colour": {"hex": "#57BBC1", "isDark": false},
    "displayCode": "PHY",
    "rawName": "Physics",
    "refId": "PHY B5",
    "defaultName": "Physics"
  },
  "ENA A1": {
    "displayName": "English",
    "colour": {"hex": "#A51221", "isDark": true},
    "displayCode": "ENG",
    "rawName": "English Advanced",
    "refId": "ENA A1",
    "defaultName": "English Advanced"
  },
  "SP 12": {
    "displayName": "Sport",
    "colour": {"hex": "#CCCCCC", "isDark": false},
    "displayCode": "SP ",
    "rawName": "Sport",
    "refId": "SP 12",
    "defaultName": "Sport"
  },
  "MX2 A7": {
    "displayName": "Mathematics Extension 2",
    "colour": {"hex": "#F0A8B6", "isDark": false},
    "displayCode": "MX2",
    "rawName": "Mathematics Extension 2",
    "refId": "MX2 A7",
    "defaultName": "Mathematics Extension 2"
  },
  "MAX A6": {
    "displayName": "Mathematics Extension 1",
    "colour": {"hex": "#97CB4D", "isDark": false},
    "displayCode": "MX1",
    "rawName": "Mathematics Extension 1",
    "refId": "MAX A6",
    "defaultName": "Mathematics Extension 1"
  },
  "CHE A3": {
    "displayName": "Chemistry",
    "colour": {"hex": "#0D4C73", "isDark": true},
    "displayCode": "CHE",
    "rawName": "12 Chemistry A3",
    "refId": "CHE A3",
    "defaultName": "Chemistry"
  },
  "DAT": {
    "displayName": "Design & Technology",
    "colour": {"hex": "#F4C325", "isDark": false},
    "displayCode": "DAT",
    "rawName": "Design & Technology",
    "refId": "DAT",
    "defaultName": "Design & Technology"
  },
  "verCon": "v18"
}

const currentDate = new Date();
export const notices = [
  (<FeedItem
      data={{
        isMeeting: 0,
        title: "Board games club ",
        content: "Come along every Wednesday lunch to play board games.\nThis is a very fun social activity and a wide selection of board games are provided.",
        authorName: "Ms A Adams",
        displayYears: "All Students"
      }}
      date={currentDate.toISOString().substring(0, 10)}
      key={0}
  />),
  (<FeedItem
      data={{
        isMeeting: 1,
        title: "Year 11 meeting",
        content: "All year 11 students shall go to the hall for a meeting during Period 2 for various announcements and award presentations. Leave your bags along the wall outside.",
        authorName: "Mr C Martin",
        displayYears: "Year 11",
        meetingDate: "2023-03-02",
        meetingTime: "10:15",
        meetingLocation: ""
      }}
      date={currentDate.toISOString().substring(0, 10)}
      key={1}
  />),
  (<FeedItem
      data={{
        isMeeting: 0,
        title: "Year 8 Science excursion",
        content: "Remember to hand in your permission notes to your teachers by next Monday. Payment can be made to the school office or online. Don't be late on the day. Bring wet weather gear and sun protection.",
        authorName: "Science faculty",
        displayYears: "Year 8"
      }}
      date={currentDate.toISOString().substring(0, 10)}
      key={2}
  />)
];


/**
 * data
 *
 * data.isMeeting 1/0
 * date yyyy-mm-dd
 * data.meetingDate
 * data.meetingTime
 * data.meetingLocation
 * data.content (html)
 * data.title
 * data.author
 * data.displayYears
 *
 * **/