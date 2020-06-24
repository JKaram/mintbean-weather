import React from "react";
import styled from "styled-components";

export default function Results(props) {
  console.log(props);

  return (
    <Wrapper>
      {!props.name && "Sorry Try Again"}
      {props.name && (
        <>
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
                <div>{Math.round(props.currentWeather.temp)}&#176;</div>
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
        </>
      )}
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
