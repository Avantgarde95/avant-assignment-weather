import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface Position {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  // ex. Seoul
  name: string;

  main: {
    // ex. 123
    temp: number;
  };

  weather: Array<{
    // ex. Clouds
    main: string;

    // ex. 04n
    icon: string;
  }>;
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const date = new Date();

  useEffect(() => {
    (async () => {
      const position = await getPosition();
      setWeatherData(await getWeatherData(position));
    })();
  }, [setWeatherData]);

  return (
    <Container isDay={isDay(date)}>
      {weatherData !== null && (
        <>
          <DateView>{formatDate(date)}</DateView>
          <Location>{weatherData.name}</Location>
          <State>{weatherData.weather[0].main}</State>
          <Icon src={getIconURL(weatherData.weather[0].icon)} alt={weatherData.weather[0].main} />
          <Temperature>{weatherData.main.temp}&deg;C</Temperature>
        </>
      )}
    </Container>
  );
};

const weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function isDay(date: Date) {
  const hour = date.getHours();
  return hour >= 9 && hour <= 17;
}

function formatDate(date: Date) {
  const month = date.getMonth() + 1;
  const monthDay = date.getDate();
  const weekDay = weekDayNames[date.getDay()];

  return `${month}/${monthDay} ${weekDay}`;
}

async function getPosition(): Promise<Position | null> {
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      resolve(null);
    }
  });
}

async function getWeatherData(position: Position | null): Promise<WeatherData> {
  const positionPart = position === null ? "q=Seoul" : `lat=${position.latitude}&lon=${position.longitude}`;
  const keyPart = `appid=${process.env.REACT_APP_WEATHER_KEY}`;
  const unitsPart = "units=metric";

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?${positionPart}&${keyPart}&${unitsPart}`
  );

  return response.data;
}

function getIconURL(iconName: string) {
  return `http://openweathermap.org/img/wn/${iconName}@4x.png`;
}

interface ContainerProps {
  isDay: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 2rem;

  color: #ffffff;
  background-color: ${({ isDay }) => (isDay ? "#a2cbe4" : "#030176")};
`;

const DateView = styled.div`
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const Location = styled.div`
  margin-bottom: 0.5rem;
  font-size: 4rem;
  font-weight: bold;
`;

const State = styled.div`
  margin-bottom: 2rem;
  font-size: 3rem;
`;

const Icon = styled.img`
  margin-bottom: 2rem;
`;

const Temperature = styled.div`
  font-size: 6rem;
  font-weight: bold;
`;

export default Weather;
