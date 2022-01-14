// import React, { useState } from "react";
// import { passItem, saveItem, passStr, saveStr } from '../version';
//
// export default function DemoPeriod(props) {
//     /**
//      props:
//
//      periodNumber
//      time
//      displayName
//      colour {hex, isDark}
//      room
//      highlightRoom
//      teacher
//      expanded
//
//      **/
//
//     const [expanded, setExpand] = useState(props.expanded);
//
//     function handleClick(e) {
//         setExpand(!expanded);
//     }
//
//     const iconStyle = {
//         backgroundColor: props.colour.hex,
//         color: (props.colour.isDark ? 'white' : 'black')
//     }
//
//     const roomClass = "period__room" + (props.highlightRoom ? " period__room--highlight" : "");
//
//     const classTags = "period page__bells__row " + (expanded ? "period--maximised" : "period--minimised");
//
//
//     const showClass = (
//         <div className={"period page__bells__row " + (expanded ? "period--maximised" : "period--minimised")} onClick={handleClick}>
//             <div className="period__top">
//                 <div className="period__icon" style={{
//                     backgroundColor: props.colour.hex,
//                     color: (props.colour.isDark ? 'white' : 'black')
//                 }}>
//                     {props.periodNumber}
//                 </div>
//                 <div className="period__name">
//                     {props.displayName}
//                 </div>
//                 <div className= {"period__room" + (props.highlightRoom ? " period__room--highlight" : "")}>
//                     {props.room}
//                 </div>
//             </div>
//             <div className={"period__details " + (cardsExpanded ? "period__details--expanded" : "period__details--closed")}>
//                 <div className="period__details__item">{props.time}</div>
//                 <div className="period__details__item">{props.teacher}</div>
//             </div>
//         </div>
//     );
//
//     return showClass;
// }
//
