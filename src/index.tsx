import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "App";
import reportWebVitals from "reportWebVitals";

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
`;

ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
