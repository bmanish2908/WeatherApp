import React from "react";
import ForecastCard from "./ForecastCard";

import "./styles/forecast.css";

export default function Forecast(props){

    const[forecast, setForecast] = React.useState();

    React.useEffect(() => {
        const fetchLink = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.cityKey}?apikey=P9B0jujAPzptIHOlSvVrQBtVMM8OwZXu`;
        fetch(fetchLink)
        .then(res => res.json())
        .then(data => {
            setForecast(data);
        });
    }, [props.cityKey]);

    if(forecast){
        const dailyForecasts = forecast.DailyForecasts;
        const components = dailyForecasts.map(day => {
            let rainChance = "None";
            if(day.Day.HasPrecipitation) rainChance = day.Day.PrecipitationIntensity;
            else if (day.Night.HasPrecipitation) rainChance = day.Night.PrecipitationIntensity;

            return(
                <ForecastCard
                    date = {day.Date}
                    maxTemp = {day.Temperature.Maximum.Value}
                    minTemp = {day.Temperature.Minimum.Value}
                    dayIcon = {day.Day.Icon}
                    nightIcon = {day.Night.Icon}
                    rainChance = {rainChance}
                />
            )
        })

        return(
            <div className="forecast-weather-container">
                <h3 className="section-title forecast-weather-title">5 Day Forecast: {forecast.Headline.Text}</h3>
                <div className="forecast-weather-cards-container">
                    {components}
                </div>
            </div>
        )
    }

}