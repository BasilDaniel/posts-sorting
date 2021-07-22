import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { baseURL } from "./api/constants";

axios.defaults.baseURL = baseURL;

ReactDOM.render(<App />, document.getElementById("root"));
