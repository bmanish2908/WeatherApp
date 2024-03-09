import React from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import HourlyWeather from "./components/HourlyWeather";
import TodayOverview from "./components/TodayOverview";

import "./App.css";


export default function App(){

  const[cityInfo, setCityInfo] = React.useState();
  const[display, setDisplay] = React.useState();

  function handleSearch(){
    const cityName = document.querySelector(".city-input").value;

    if(cityName){
      searchCityCode(cityName);
    }

    else alert("Enter City/Zip");
  }

  function searchCityCode(cityName){
    let fetchLink = "http://dataservice.accuweather.com/locations/v1/cities/search";
    fetchLink += `?apikey=P9B0jujAPzptIHOlSvVrQBtVMM8OwZXu&q=${encodeURIComponent(cityName)}`;
    fetch(fetchLink)
    .then(res => res.json())
    .then(data => {
      setCityInfo(data[0]);
    })
    .catch(error => console.log(error));
  }

  React.useEffect(() => {
    if(cityInfo){
      const newDisplay = (
        <div className="display-container">
          <h2 className="city-name-information-block">
            Weather in {cityInfo.LocalizedName}, {cityInfo.AdministrativeArea.ID}, {cityInfo.Country.LocalizedName}
          </h2>

          <div className="weather-information-container">
            <div className="current-and-overview">
              <CurrentWeather cityKey = {cityInfo.Key}/>
              <TodayOverview cityKey = {cityInfo.Key}/>
            </div>
            <HourlyWeather cityKey = {cityInfo.Key}/>
            <Forecast cityKey = {cityInfo.Key}/>
          </div>
        </div>
      )

      setDisplay(newDisplay);
    }
  }, [cityInfo])

  /*
    - Location
    - Today's weather overview (High, Low Temperatures)
    - Current Weather at Current Time
      - Temperature
      - Sunny/Cloudy/Rainy
      - Air Quality if available
    - Hourly Weather Today
      - Time
      - Condition
      - Temperature
      - Precipitation
    - 5-day weather forecast
      - Date
      - Condition
      - High temperature
      - Low temperature
      - Short Description
      - Precipitation
  */

  return(

    <div className="all-contents-container">
      <div className="inputs">
        <input className="city-input" placeholder="Enter City Name"></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {cityInfo && display}
    </div>
  )
}