import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { API_URL, AUTH_TOKEN, USER } from "../../utils/constants";
import { getAuthToken, setStoredItem } from "../../utils/helper";
import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6d01ed",
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

const Login = () => {
  const authToken = getAuthToken();
  const classes = useStyles();
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState({});
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
      .post(`${API_URL}/auth/login`, data)
      .then((result) => {
        if (result?.status === 200 && result?.data) {
          setShowNoti({
            open: true,
            message: "Login Successfully",
            type: "success",
          });
          setTimeout(() => {
            setStoredItem(AUTH_TOKEN, result?.data?.accessToken);
            setStoredItem(USER, JSON.stringify(result?.data));
            navigate("/");
          }, 1500);
        }
      })
      .catch((error) => {
        setShowNoti({
          open: true,
          message: "Login failed",
          type: "error",
        });
        console.log(error);
      });
  };

  return (
    <>
      {authToken && <Navigate to="/" replace={true} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            EQUIPMENT MANAGEMENT
          </Typography>
          <Typography component="h1" variant="h5">
            LOGIN
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

            <Button
              type="submit"
              className="btn-primary"
              variant="contained"
              fullWidth
            >
              Sign In
            </Button>
            <Box my={3} minWidth="100%">
              <Typography variant="subtitle1">
                Don't have an account?
                <Link to={"/register"}>Register</Link>
              </Typography>
            </Box>
          </form>
        </div>
      </Container>
      <Notification
        type={showNoti?.type}
        openNotification={showNoti?.open}
        message={showNoti?.message}
      />
    </>
  );
};

export default Login;
