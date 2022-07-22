import React from "react";
import styled from "styled-components";

const Weather = () => (
  <Container isDay>
    <DateView>9/30 SAT</DateView>
    <Location>Seoul</Location>
    <State>Rain</State>
    <Icon src="http://openweathermap.org/img/wn/10d@4x.png" alt="10d" />
    <Temperature>10&deg;C</Temperature>
  </Container>
);

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
