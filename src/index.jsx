import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { App } from "./components";
import reportWebVitals from "./reportWebVitals";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c7bbc9",
    },
    secondary: {
      main: "#83adb5",
    },
    background: {
      default: "#2e4045",
    },
    text: {
      primary: "#c7bbc9",
      secondary: "#bfb5b2",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "OxygenRegular, OxygenRegular, OxygenLight",
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
