import React, { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
import jpc from "./ori_3488361_442578d19f292a7e23ef9c56e5afe4291487d5e3_vector-clouds-weather-seamless-pattern.jpg";

import { Loading } from "./components/Loading";
import Results from "./components/Results";

const GlobalStyle = createGlobalStyle`
  body {
    background: #efefef;
    min-height: 100vh;
    margin: 0;
    font-family: 'Quicksand', sans-serif;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    
    
  }

  body::after {
  content: "";
  background-image: url(${jpc});
  background-repeat: repeat;
  opacity: 0.3;
  z-index: -1;
    top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;      
}
`;

function App() {
  const [state, setState] = useState({
    loading: false,
    name: null,
    currentWeather: {
      humidity: null,
      pressure: null,
      temp: null,
      temp_max: null,
      temp_min: null,
      windSpeed: null,
      description: null,
      icon: null,
    },
  });
  const [searchBox, setSearchBox] = useState("Toronto");
  const token = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  const getWeather = async (text) => {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchBox}&units=metric&appid=${token}`
    );
    console.log(res);

    return res;
  };

  const search = useCallback(async (text) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const weatherData = await getWeather(text);

    setState((prevState) => ({
      ...prevState,
      name: weatherData.data.name,
      currentWeather: {
        humidity: weatherData.data.main.humidity,
        pressure: weatherData.data.main.pressure,
        temp: weatherData.data.main.temp,
        windSpeed: weatherData.data.wind.speed,
        description: weatherData.data.weather[0].description,
        icon: weatherData.data.weather[0].icon,
      },
    }));

    setTimeout(function () {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }, 2100);
  });

  useEffect(() => {
    search(searchBox);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <GlobalStyle />
      <form
        style={{
          display: "flex",
          maxWidth: "600px",
          width: "100%",
          margin: "80px auto 30px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchBar
          type="text"
          name="name"
          onChange={(e) => setSearchBox(e.target.value)}
          placeholder="Search for a city"
        />

        <SearchBtn onClick={search}>Search</SearchBtn>
      </form>

      <div>
        {state.loading && <Loading />}
        {!state.loading && state.name && (
          <Results name={state.name} currentWeather={state.currentWeather} />
        )}
      </div>
    </div>
  );
}

export default App;

const SearchBar = styled.input`
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  max-width: 400px;
  width: 80%;
  background: #ffff;
`;

const SearchBtn = styled.button`
  float: left;
  padding: 10px;
  width: 20%;
  background: #2196f3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
`;
