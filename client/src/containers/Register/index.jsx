import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../utils/constants";
import HowToRegIcon from "@mui/icons-material/HowToReg";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#ed8a01",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formField: {
    marginBottom: 20,
  },
  registerLink: {
    marginTop: 5,
  },
}));

export default function Register() {
  const classes = useStyles();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState("No");
  const myHelper = {
    email: {
      required: "Email is Required",
      pattern: "Invalid Email Address",
    },
    password: {
      required: "Password is Required",
      minLength: "Password must contain at least 6 characters",
    },
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${API_URL}/api/auth/login`, data)
      .then((result) => {
        if (result?.status === 200 && result?.data) {
          navigate("/");
          //setAuthenticated(true);
        }
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {authenticated && <Navigate to="/" replace={true} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            EQUIPMENT MANAGEMENT
          </Typography>
          <Typography component="h1" variant="h5">
            REGISTER
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="email"
                    fullWidth
                    label="Email"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    fullWidth
                    label="Password"
                    error={error !== undefined}
                    helperText={error ? myHelper.password[error.type] : ""}
                  />
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="Name"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    label="Name"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Box>

            <Box
              my={3}
              minWidth="100%"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1">Is Admin?</Typography>
              <ToggleButtonGroup
                color="primary"
                value={isAdmin}
                exclusive
                onChange={(event) => {
                  setIsAdmin(event.target.value);
                }}
                aria-label="Platform"
                className="toggle-buttons"
              >
                <ToggleButton value="Yes">Yes</ToggleButton>
                <ToggleButton value="No">No</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button
              type="submit"
              className="btn-primary"
              variant="contained"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Register
            </Button>
            <Box my={3} minWidth="100%">
              <Typography variant="subtitle1">
                Already signed up? <Link to={"/login"}>Sign In</Link>
              </Typography>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
}
