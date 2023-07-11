import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Render the App component into the root element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    <App />{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// Report web vitals to the console
reportWebVitals(console.log);
