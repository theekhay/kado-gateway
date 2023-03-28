import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./sass/main.scss";
import reportWebVitals from "./reportWebVitals";
import GetApiState from "./context/get-api-calls/GetApiState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GetApiState>
      <App />
    </GetApiState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
