import React from "react";

export default function ForecastCard(props){

    const dateString = props.date;
    const date = new Date(dateString);
    const dayOfWeekNumber = date.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

    function fahrenheitToCelsius(temp) {
        return Math.round((temp - 32) * 5 / 9);
    }

    const dayIcon = `../images/${props.dayIcon.toString()}.png`;
    const nightIcon = `../images/${props.nightIcon.toString()}.png`;

    return(
        <div className="forecast-card-container">
            <p className="forecast-card-date">{dayOfWeekName}</p>
            <div style={{display:"flex", alignItems:"center", columnGap:"7px", width:"100px"}}>
                <img className="rain-icon" src="../images/rai.png"></img>
                <p style={{color:"white"}}>{props.rainChance}</p>
            </div>
            <img src={dayIcon}></img>
            <img src={nightIcon}></img>
            <p className="forecast-card-temps">{fahrenheitToCelsius(props.maxTemp)}° / {fahrenheitToCelsius(props.minTemp)}°</p>
        </div>
    )
}