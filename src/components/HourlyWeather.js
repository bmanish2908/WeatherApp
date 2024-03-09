import React from "react";
import HourCard from "./HourCard";

import "./styles/hourly.css";

export default function HourlyWeather(props){
    const[hourlyWeather, setHourlyWeather] = React.useState();

    React.useEffect(() => {
        const fetchLink = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${props.cityKey}?apikey=P9B0jujAPzptIHOlSvVrQBtVMM8OwZXu`;
        fetch(fetchLink)
        .then(res => res.json())
        .then(data => {
            setHourlyWeather(data.slice(0, 5));
        });
    }, [props.cityKey]);


    if(hourlyWeather){

        const components = hourlyWeather.map(hour => 
            <HourCard 
                time = {hour.DateTime}
                temp = {hour.Temperature.Value}
                icon = {hour.WeatherIcon}
            />
        )
        
        return(
            <div className="hourly-weather-container">
                <h3 className="section-title hourly-weather-title">Weather in the next 5 hours:</h3>

                <div className="hourly-weather-cards-container">
                    {components}
                </div>

            </div>
        )
    }
}