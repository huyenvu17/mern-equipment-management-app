import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Controller, useForm } from "react-hook-form";
import { Button, Select, TextField } from "@material-ui/core";
import { Box, Chip, MenuItem } from "@mui/material";
import axios from "axios";
import { API_URL, ISSUE_AND_RETURN, USER } from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

export const ISSUE_STATUS = ["Borrowing", "Returned"];


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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const IssueAndReturnForm = ({ setShowNoti, isEdit, editRow }) => {
  const {rowData, employees, equipments} = editRow
  const theme = useTheme();
  const userInfo = JSON.parse(getStoredItem(USER));
  const classes = useStyles();
  const [selectedEquipments, setSelectedEquipments] = useState(equipments?.filter(equipment => rowData?.equipment?.includes(equipment?._id))?.map(item => item?.name) || []);
  const [selectedEmployee, setSelectedEmployee] = useState(employees?.find(employee=> employee?._id === rowData?.employee) || []);
  const [issueStatus, setIssueStatus] = useState(rowData?.status);
  const [selectedBorrowDate, setSelectedBorrowDate] = useState(rowData?.borrowDate);
  const [selectedReturnDate, setSelectedReturnDate] = useState(rowData?.returnDate);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleEquipmentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedEquipments(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const savedIssue = {
      ...data,
      borrowDate: selectedBorrowDate,
      returnDate: selectedReturnDate,
      status: issueStatus,
      equipment: equipments?.filter(equipment => selectedEquipments?.includes(equipment?.name))?.map(item => item?._id),
      employee: employees?.find(employee => employee?.email === selectedEmployee)?._id
    };


    if (isEdit) {
      axios
        .put(`${API_URL}/${ISSUE_AND_RETURN}/${rowData?._id}`, savedIssue, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          if (result?.status === 200 && result?.data) {
            setShowNoti({
              open: true,
              message: "Issue updated successfully!",
              type: "success",
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to update Issue!",
              type: "error",
            });
          } 
        });
    } else {
      axios
        .post(`${API_URL}/${ISSUE_AND_RETURN}`, savedIssue, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          if (result?.status === 201 && result?.data) {
            setShowNoti({
              open: true,
              message: "Issue created successfully!",
              type: "success",
            });
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error?.response?.status === 403) {
            setShowNoti({
              open: true,
              message: "You are not allowed to create Issue!",
              type: "error",
            });
          } else {
            setShowNoti({
              open: true,
              message: "Cannot create Issue. Please check again!",
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
              <Typography variant="subtitle1">Equipment</Typography>
              <Controller
                key="equipments"
                control={control}
                name="equipment"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedEquipments}
                    onChange={handleEquipmentChange}
                    style={{ width: "100%" }}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected?.map((item) => (
                          <Chip key={item} label={item} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {equipments?.map((equipment) => (
                      <MenuItem
                        key={equipment?._id}
                        value={equipment?.name}
                        style={getStyles(equipment?.name, equipments, theme)}
                      >
                        {equipment?.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <Typography variant="subtitle1">Borrower</Typography>
              <Controller
                control={control}
                name="employee"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    style={{ width: "100%" }}
                    value={selectedEmployee?.email}
                    onChange={(event) =>
                      setSelectedEmployee(event.target.value)
                    }
                  >
                    {employees?.map((item) => (
                      <MenuItem key={item?._id} value={item?.email}>
                        {item?.email}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Borrow Date"
                  inputFormat="DD/MM/YYYY"
                  value={selectedBorrowDate}
                  onChange={(value) =>
                    setSelectedBorrowDate(value)
                  }
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box my={3} minWidth="100%">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Return Date"
                  inputFormat="DD/MM/YYYY"
                  value={selectedReturnDate}
                  onChange={(value) =>
                    setSelectedReturnDate(value)
                  }
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box my={3} minWidth="100%">
              <Typography variant="subtitle1">Status</Typography>
              <Controller
                control={control}
                name="status"
                defaultValue={isEdit ? rowData?.type : ""}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    style={{ width: "100%" }}
                    value={issueStatus}
                    onChange={(event) => setIssueStatus(event.target.value)}
                  >
                    {ISSUE_STATUS?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
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

export default IssueAndReturnForm;
