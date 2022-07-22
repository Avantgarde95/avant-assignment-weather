import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Weather from "weather/Weather";

const Global = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-size: 62.5%;
    font-family: "Raleway", sans-serif;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

const App = () => (
  <Container>
    <Global />
    <Weather />
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
