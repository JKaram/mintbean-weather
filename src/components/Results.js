import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function Results(props) {
  console.log(props);

  return (
    <Wrapper>
      <City>{props.name}</City>
      <Current>
        <Icon
          src={`http://openweathermap.org/img/wn/${props.currentWeather.icon}@2x.png`}
          alt={props.currentWeather.description}
        />
        <Stat>{props.currentWeather.description}</Stat>
        <div style={{ display: "flex", margin: "20px 0" }}>
          <Stat>
            <div>Temp</div>
            <div>{Math.round(props.currentWeather.temp)}&#8451;</div>
          </Stat>
          <Stat>
            <div>Humidity</div>
            <div>{props.currentWeather.humidity}%</div>
          </Stat>
          <Stat>
            <div>Wind Speed</div>
            <div>{props.currentWeather.windSpeed}</div>
          </Stat>
        </div>
      </Current>
      <City style={{ paddingBottom: "10px" }}>5 Day Forcast</City>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        {props.forcast.map((day) => {
          var daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];

          const date = moment(day["dt_txt"]);
          const dow = date.day();

          return (
            <div key={day.dt}>
              <Stat>
                <div>{daysOfWeek[dow]}</div>

                <div>{Math.round(day.main.temp)}&#176;</div>
              </Stat>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 30px auto 0;
  background: #fff;
  -webkit-box-shadow: 0 8px 6px -6px black;
  -moz-box-shadow: 0 8px 6px -6px black;
  box-shadow: 0 8px 6px -6px black;
`;
const Current = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;
const City = styled.h2`
  text-align: center;
  font-size: 40px;
  padding-top: 20px;
  margin: 0;
`;

const Icon = styled.img`
  width: 100px;
`;

const Stat = styled.div`
  font-size: 24px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`;
