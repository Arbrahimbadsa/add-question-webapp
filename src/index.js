import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import "./firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Latex from "./components/Latex";

ReactDOM.render(
  <React.StrictMode>
    <Latex>
      <App />
    </Latex>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
