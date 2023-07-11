import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -25.344,
  lng: 131.031,
};

const mapOptions = {
  zoom: 4,
  center,
  mapId: "DEMO_MAP_ID",
};

ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions}
      />
    </LoadScript>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
