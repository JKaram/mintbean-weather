import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import axios from "axios";

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
  const [searchBox, setSearchBox] = useState("");
  const token = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  const getWeather = async (text) => {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchBox}&units=metric&appid=${token}`
    );
    console.log(res);

    return res;
  };

  const search = async (text) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const weatherData = await getWeather(text);
    if (weatherData.statusText === "OK") {
      return setState((prevState) => ({
        ...prevState,
        loading: false,
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
    }
    return setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };
  console.log(state);

  return (
    <div>
      <GlobalStyle />
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={(e) => setSearchBox(e.target.value)}
          />
        </label>
      </form>
      <button onClick={search}>What is the weather?</button>

      <div>
        {state.loading && <Loading />}
        {state.name && (
          <Results name={state.name} currentWeather={state.currentWeather} />
        )}
      </div>
    </div>
  );
}

export default App;
