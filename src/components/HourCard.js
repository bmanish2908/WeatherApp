import React from "react";

export default function HourCard(props){

    const dateString = props.time;
    const date = new Date(dateString);

    // Get the hours and minutes from the date object
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Format the time as HH:MM
    const time = `${hours}:${minutes}`;

    const icon = `../images/${props.icon.toString()}.png`;

    function fahrenheitToCelsius(temp) {
        return Math.round((temp - 32) * 5 / 9);
    }


    return(
        <div className="hour-card-container">
            <p className="hour-card-time">{time}</p>
            <img src={icon}></img>
            <p className="hour-card-temp">{fahrenheitToCelsius(props.temp)}°</p>
        </div>
    )
}