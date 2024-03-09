import React from "react";
import "./styles/current.css";

export default function CurrentWeather(props){

    const[currentWeather, setCurrentWeather] = React.useState();

    React.useEffect(() => {
        const fetchLink = `http://dataservice.accuweather.com/currentconditions/v1/${props.cityKey}?apikey=P9B0jujAPzptIHOlSvVrQBtVMM8OwZXu`;
        fetch(fetchLink)
        .then(res => res.json())
        .then(data => {
            setCurrentWeather(data[0]);
        });
    }, [props.cityKey]);

    function getCurrentTime() {
        const date = new Date();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const hours = date.getHours() % 12 || 12; // Convert hours to 12-hour format
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are 2 digits
        const ampm = date.getHours() < 12 ? 'AM' : 'PM'; // Determine if it's AM or PM
        const formattedTime = `${hours}:${minutes} ${ampm}`;
              const formattedDateTime = `${dayOfWeek}, ${formattedTime}`;
      
        return formattedDateTime;
      }


    if(currentWeather){

        const dateTime = getCurrentTime();
        const icon = `../images/${currentWeather.WeatherIcon.toString()}.png`;
        return(
            
            <div className="current-weather-container">
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h3 className="current-temperature">{Math.round(currentWeather.Temperature.Metric.Value)}°</h3>
                    <h5 className="current-condition">{currentWeather.WeatherText}</h5>
                    <p className="current-date-time">{dateTime}</p>
                </div>
                <div>
                    <img className="current-weather-icon" src={icon}></img>
                </div>
            </div>
                
        )
    }
}