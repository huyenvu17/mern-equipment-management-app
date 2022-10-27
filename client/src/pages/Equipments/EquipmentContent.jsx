import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Button, Select, TextField } from "@material-ui/core";
import { Box, MenuItem, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_URL, EQUIPMENTS_PATH, USER } from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";
import { EQUIPMENT_TYPE } from ".";

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

const EquipmentContent = ({ setShowNoti, isEdit, editRow }) => {
  const userInfo = JSON.parse(getStoredItem(USER));
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState("No");
  const [equipmentType, setEquipmentType] = useState(EQUIPMENT_TYPE[0]);

  const myHelper = {
    name: {
      required: "Name is Required",
    },
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const savedEquipment = {
      ...data,
      type: equipmentType,
      isActive: isActive === "Yes" ? true : false,
    };
    if (isEdit) {
      axios
        .put(`${API_URL}/${EQUIPMENTS_PATH}/${editRow?._id}`, savedEquipment, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          console.log(result);
          if (result?.status === 200 && result?.data) {
            setShowNoti({
              open: true,
              message: "Equipment updated successfully!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to update equipment!",
              type: "error",
            });
          } else {
            setShowNoti({
              open: true,
              message: "Cannot update equipment. Please check again!",
              type: "error",
            });
          }
        });
    } else {
      axios
        .post(`${API_URL}/${EQUIPMENTS_PATH}`, savedEquipment, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          console.log(result);
          if (result?.status === 201 && result?.data) {
            setShowNoti({
              open: true,
              message: "Equipment created successfully!",
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to create equipment!",
              type: "error",
            });
          } else {
            setShowNoti({
              open: true,
              message: "Cannot create equipment. Please check again!",
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
                name="name"
                defaultValue={isEdit ? editRow?.name : ""}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    label="Name"
                    error={error !== undefined}
                    helperText={error ? myHelper.name[error.type] : ""}
                  />
                )}
              />
            </Box>

            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="description"
                defaultValue={isEdit ? editRow?.description : ""}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    label="Description"
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
              <Typography variant="subtitle1">Is Active?</Typography>
              <ToggleButtonGroup
                color="primary"
                name="isActive"
                value={isEdit ? (editRow?.isActive ? "Yes" : "No") : isActive}
                exclusive
                onChange={(event) => {
                  setIsActive(event.target.value);
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

export default EquipmentContent;
