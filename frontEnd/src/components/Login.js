import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Made with ♥ by "}
      <Link color="inherit" href="https://hernandez.dev/">
        Amazon RSH team
      </Link>{" "}
    </Typography>
  );
}

export default function Login() {
  const [showLoginError, setShowLoginError] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const localUser = localStorage.getItem("user");
  if(localUser) {
    const localUserObj = JSON.parse(localUser);
    auth.login(localUserObj);
    return <Navigate to={`/${localUserObj.role.toLowerCase()}`} />
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios({
      method: 'post',
      url: 'https://localhost:8000//signin',
      data: {
        email: data.get('username'),
        password: data.get('password')
      }
    })
    .then(function (response) {
      setShowLoginError(false);
      setShowLoginSuccess(true);
      axios({
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + response.data.token
        },
        url: 'https://azul-api.ccmchallenges.com/profile',
      }).
      then(function (anotherResponse) {
        localStorage.setItem("token", response.data.token);
        const loggedUser = {
          token: response.data.token,
          role: anotherResponse.data.principal.role,
          employee_id: anotherResponse.data.principal.employee_id,
          name: anotherResponse.data.principal.name,
          email: anotherResponse.data.principal.email,
          asign_supervisor: anotherResponse.data.principal.asign_supervisor
        }
        if(data.get('remember')) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
          
        }
        auth.login(loggedUser);
        navigate(`/${anotherResponse.data.principal.role.toLowerCase()}`);
      })
    })
    .catch(function (error) {
      setShowLoginError(true);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 200,
            width: 200,
            maxHeight: { xs: 100, md: 200 },
            maxWidth: { xs: 100, md: 200 },
          }}
          alt="Amazon RSH logo"
          src="https://i.ibb.co/fMwg7kH/amazon-RSH.png"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {showLoginError && (
            <Alert severity="error">Invalid username or password</Alert>
          )}
          {showLoginSuccess && (
            <Alert severity="success">Succesful login</Alert>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}