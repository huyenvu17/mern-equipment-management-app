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
import moment from "moment";

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
const IssueAndReturnForm = ({ setShowNoti, isEdit, editRow, handleReloadData }) => {
  console.log("isEdit",isEdit)
  const {rowData, employees, equipments} = editRow
  const theme = useTheme();
  const userInfo = JSON.parse(getStoredItem(USER));
  const classes = useStyles();
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(employees?.find(employee=> employee?._id === rowData?.employee));
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
    console.log("selectedEmployee",selectedEmployee)
    console.log("selectedEquipments",selectedEquipments, rowData)
    const savedIssue = {
      ...data,
      borrowDate: selectedBorrowDate,
      returnDate: selectedReturnDate,
      status: issueStatus,
      equipment: equipments?.map(equipment => selectedEquipments?.includes(equipment?.name)),
      employee: employees?.find(employee => employee?.email === selectedEmployee)
    };
    console.log("savedIssue",savedIssue)
    if (isEdit) {
      axios
        .put(`${API_URL}/${ISSUE_AND_RETURN}/${rowData?._id}`, savedIssue, {
          headers: setAuthHeader(userInfo?.accessToken),
        })
        .then((result) => {
          console.log(result);
          if (result?.status === 200 && result?.data) {
            setShowNoti({
              open: true,
              message: "Issue updated successfully!",
              type: "success",
            });
            //window.location.reload();
            handleReloadData(true);
          }
        })
        .catch((error) => {
          console.log(error);
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
          console.log(result);
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
          console.log(error);
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
                name="equipments"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedEquipments}
                    onChange={handleEquipmentChange}
                    style={{width: "100%"}}
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
                name="borrower"
                //defaultValue={isEdit ? editRow?.type : ""}
                render={({ field, fieldState: { error } }) => (
                  <Select
                  style={{width: "100%"}}
                    value={selectedEmployee?.email}
                    onChange={(event) => setSelectedEmployee(event.target.value)}  
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
              <Controller
                control={control}
                name="borrowDate"
                //defaultValue={isEdit ? rowData?.borrowDate : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    key={field?.id}
                    type="date"
                    value={isEdit ? moment(rowData?.borrowDate).format("mm/dd/yyyy") : ""}
                    fullWidth
                    label="Borrow Date"
                    onChange={(event) => setSelectedBorrowDate(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
              <Controller
                control={control}
                name="returnDate"
                defaultValue={isEdit ? rowData?.returnDate : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    value={isEdit ? rowData?.returnDate : ""}
                    onChange={(event) => setSelectedReturnDate(event.target.value)}
                    label="Return Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Box>
            <Box my={3} minWidth="100%">
            <Typography variant="subtitle1">Status</Typography>
            <Controller
                control={control}
                name="status"
                defaultValue={isEdit ? rowData?.type : ""}
                render={({ field, fieldState: { error } }) => (
                  <Select
                  style={{width: "100%"}}
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
