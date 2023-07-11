import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Map } from "./components/Map/Map";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

ReactDOM.render(
  <React.StrictMode>
    <App />{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
