import React from "react";
import "./styles/today.css";

export default function TodatOverview(props){

    const[todayOverview, setTodayOverview] = React.useState();

    React.useEffect(() => {
        const fetchLink = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${props.cityKey}?apikey=P9B0jujAPzptIHOlSvVrQBtVMM8OwZXu`;
        fetch(fetchLink)
        .then(res => res.json())
        .then(data => {
            setTodayOverview(data);
        });
    }, [props.cityKey]);

    function fahrenheitToCelsius(temp) {
        return Math.round((temp - 32) * 5 / 9);
    }

    if(todayOverview){
        
        return(
            <div className="today-overview-container">
                
                <div className="today-temperatures">

                    <p className="today-high-temperature">
                        Todays' High: {fahrenheitToCelsius(todayOverview.DailyForecasts[0].Temperature.Maximum.Value)}°
                    </p>

                    <p className="today-low-temperature">
                        Today's Low: {fahrenheitToCelsius(todayOverview.DailyForecasts[0].Temperature.Minimum.Value)}°
                    </p>

                </div>
            </div>
        )
    }
}