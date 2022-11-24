import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Button,  TextField } from "@material-ui/core";
import { Box,  ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { API_URL, EMPLOYEES_PATH, REGISTER_PATH, USER } from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
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

const EmployeesForm = ({ setShowNoti, isEdit, editRow }) => {
  const userInfo = JSON.parse(getStoredItem(USER));
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(isEdit ? editRow?.isAdmin ? "Yes" : "No" : "No");
  const myHelper = {
    name: {
      required: "Name is Required",
    },
    email: {
      required: "Email is Required",
      pattern: "Invalid Email Address",
    },
    password: {
      required: "Password is Required",
      minLength: "Password must contain at least 6 characters",
    },
    username: {
      required: "Username is Required",
      minLength: "Username must contain at least 4 characters",
    },
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const savedEmployee = {
      ...data,
      isAdmin: isAdmin === "Yes" ? true : false,
    };
    if (isEdit) {
      axios
        .put(`${API_URL}/${EMPLOYEES_PATH}/${editRow?._id}`, savedEmployee, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          console.log(result);
          if (result?.status === 200 && result?.data) {
            setShowNoti({
              open: true,
              message: "employee updated successfully!",
              type: "success",
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to update employee!",
              type: "error",
            });
          } else {
            setShowNoti({
              open: true,
              message: "Cannot update employee. Please check again!",
              type: "error",
            });
          }
        });
    } else {
      axios
        .post(`${API_URL}/${REGISTER_PATH}`, savedEmployee, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          console.log(result);
          if (result?.status === 201 && result?.data) {
            setShowNoti({
              open: true,
              message: "Employee created successfully!",
              type: "success",
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to create employee!",
              type: "error",
            });
          } else {
            setShowNoti({
              open: true,
              message: "Cannot create employee. Please check again!",
              type: "error",
            });
          }
        });
    }
  };

  return (
    <>
      <Container>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="email"
                defaultValue={isEdit ? editRow?.email : ""}
                rules={{
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    disabled={isEdit}
                    type="email"
                    fullWidth
                    label="Email"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Box>
            {!isEdit && <Box my={3} minWidth="100%">
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
            </Box>}
            
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="username"
                defaultValue={isEdit ? editRow?.username : ""}
                rules={{
                  required: true,
                  minLength: 4,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    label="Username"
                    error={error !== undefined}
                    helperText={error ? myHelper.username[error.type] : ""}
                  />
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="name"
                defaultValue={isEdit ? editRow?.name : ""}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} type="text" fullWidth label="Name" />
                )}
              />
            </Box>
            {/* <Box
              my={3}
              minWidth="100%"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1">Type</Typography>
              <Controller
                control={control}
                name="type"
                defaultValue={isEdit ? editRow?.type : ""}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    value={isEdit ? editRow?.type : equipmentType}
                    onChange={(event) => setEquipmentType(event.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" key={0}>
                      <em>None</em>
                    </MenuItem>
                    {EQUIPMENT_TYPE?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box> */}
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
                name="isAdmin"
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
              {isEdit ? "Update" : "Create"}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default EmployeesForm;
