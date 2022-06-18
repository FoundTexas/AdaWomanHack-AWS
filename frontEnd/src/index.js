import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import * as serviceWorker from "./serviceWorker";

import Landing from "./components/LandingPage/Base";
import AgentDashboard from "./components/agent/Dashboard";
import SupervisorDashboard from "./components/supervisor/Dashboard";
import ManagerDashboard from "./components/manager/Dashboard";

import Home from "./components/Login";
import { AuthProvider } from "./components/auth";
import { RequireAuth } from "./components/RequireAuth";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#d1d9ff",
      main: "#9fa8da",
      dark: "#6f79a8",
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Home />} />
          <Route
            path="/agent/*"
            element={
              <RequireAuth>
                <AgentDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/supervisor/*"
            element={
              <RequireAuth>
                <SupervisorDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/manager/*"
            element={
              <RequireAuth>
                <ManagerDashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
