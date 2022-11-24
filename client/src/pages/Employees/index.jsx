import React, { useCallback, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import {
  Container,
  createTheme,
  Icon,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  API_URL,
  EMPLOYEES_PATH,
  USER,
} from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";
import EmployeesForm from "./EmployeesForm";
import ModalComponent from "../../components/Modal";
import Notification from "../../components/Notification";
import Confirmation from "../../components/Confirmation";

const Employees = () => {
  const userInfo = JSON.parse(getStoredItem(USER));
  const [user, setUser] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNoti, setShowNoti] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [equipments,setEquipments] = useState([]);

  let columns = [
    { title: "USERNAME", field: "username", width: "50%" },
    {
      title: "EMAIL",
      field: "email",
      width: "50%",
    },
    {
      title: "NAME",
      field: "name",
      width: "50%",
    },
    {
      title: "EQUIPMENTS",
      field: "equipment",
      render: (row) => <div>{row?.equipment?.map((item) => item)}</div>,
    },
    {
      title: "ADMIN",
      field: "isAdmin",
      render: (row) => (
        <div
          style={{
            width: 60,
            padding: 5,
            textAlign: "center",
            borderRadius: 5,
            color: "white",
            backgroundColor: row?.isAdmin ? "#8025eb" : "#878787",
          }}
        >
          {row?.isAdmin ? "Admin" : "Member"}
        </div>
      ),
    },
  ];
  const fetchEquipments = useCallback(() => {
    axios
      .get(`${API_URL}/${EMPLOYEES_PATH}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        const equipments = res.data;
        setEquipments(equipments);
      });
  }, [userInfo?.accessToken, setEquipments]);

  const fetchEmployees = useCallback(() => {
    axios
      .get(`${API_URL}/${EMPLOYEES_PATH}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        const users = res.data;
        setUser(users);
      });
  }, [userInfo?.accessToken, setUser]);

  useEffect(() => {
    fetchEmployees();
    fetchEquipments();
  }, [fetchEquipments, fetchEmployees]);

  const handleDeleteEquipment = () => {
    console.log();
    axios
      .delete(`${API_URL}/${EMPLOYEES_PATH}/${editRow._id}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((response) => {
        if (response?.status === 201 && response?.data) {
          setShowNoti({
            open: true,
            message: "Equipment deleted successfully!",
            type: "success",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error?.response?.status === 403) {
          setShowNoti({
            open: true,
            message: "You are not allowed to delete equipment!",
            type: "error",
          });
        } else {
          setShowNoti({
            open: true,
            message: "Cannot delete equipment. Please check again!",
            type: "error",
          });
        }
      });
  };

  return (
    <Container className="table-comp">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Employees"
          columns={columns}
          data={user}
          components={{
            Toolbar: (props) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: 18,
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Employees
                </Typography>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          icons={{
            Add: (props) => <Icon {...props}>add_circle</Icon>,
          }}
          options={{
            //pageSize: 10,
            showTitle: false,
            headerStyle: {
              borderBottomColor: "#6d01ed",
              borderBottomWidth: "3px",
              fontFamily: "verdana",
            },
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: "edit",
              onClick: (event, rowData) => {
                console.log(rowData);
                setIsEdit(true);
                setEditRow(rowData);
                setShowEquipmentModal(true);
              },
            },
            {
              icon: "delete",
              onClick: (event, rowData) => {
                setEditRow(rowData);
                setShowConfirmModal(true);
              },
            },
            {
              icon: "add_circle",
              isFreeAction: true,
              onClick: () => {
                setIsEdit(false);
                setShowEquipmentModal(true);
              },
            },
          ]}
        />
      </ThemeProvider>

      <ModalComponent
        openModal={showEquipmentModal}
        header={isEdit ? "Edit Employee" : "New Employee"}
        content={
          <EmployeesForm
            setShowNoti={(value) => setShowNoti(value)}
            isEdit={isEdit}
            editRow={editRow}
          />
        }
        handleCloseModal={() => setShowEquipmentModal(false)}
      />
      <Notification
        type={showNoti?.type}
        openNotification={showNoti?.open}
        message={showNoti?.message}
        handleCloseNotification={() => setShowNoti({ open: false })}
      />
      <Confirmation
        openModal={showConfirmModal}
        header={"Are you sure to delete this employee?"}
        content={`Delete ${editRow?.name}`}
        handleOK={handleDeleteEquipment}
        handleCloseModal={() => setShowConfirmModal(false)}
      />
    </Container>
  );
};

export default Employees;
