import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
}));

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();

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
  };

  return (
    <>
      {/* {user?.email && <Navigate to="/list" replace={true} />} */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            EQUIPMENT MANAGEMENT
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

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

            <Button color="primary" type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
