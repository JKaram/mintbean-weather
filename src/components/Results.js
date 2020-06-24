import React from "react";

export default function Results(props) {
  console.log(props);

  return (
    <>
      <h2>{props.name}</h2>
      Current Temp : {Math.round(props.currentWeather.temp)} Celcius <br />
      Humidity : {props.currentWeather.humidity}
      <br />
      WindSpeed : {props.currentWeather.windSpeed}
      <br />
    </>
  );
}
