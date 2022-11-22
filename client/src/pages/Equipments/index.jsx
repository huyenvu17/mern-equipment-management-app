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
import { API_URL, EQUIPMENTS_PATH, USER } from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";
import EquipmentForm from "./EquipmentForm";
import ModalComponent from "../../components/Modal";
import Notification from "../../components/Notification";
import Confirmation from "../../components/Confirmation";

export const EQUIPMENT_TYPE = ["Laptop", "PC"];

const Equipments = () => {
  const userInfo = JSON.parse(getStoredItem(USER));
  const [user, setUser] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNoti, setShowNoti] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [refetchData, setRefetchData] = useState(false);
  let columns = [
    { title: "NAME", field: "name" },
    {
      title: "TYPE",
      field: "type",
      width: "50%",
    },
    { title: "DESCRIPTION", field: "description" },
    {
      title: "ACTIVE",
      field: "isActive",
      render: (row) => (
        <div
          style={{
            width: 60,
            padding: 5,
            textAlign: "center",
            borderRadius: 5,
            color: "white",
            backgroundColor: row?.isActive ? "#8025eb" : "#878787",
          }}
        >
          {row?.isActive ? "Active" : "Inactive"}
        </div>
      ),
    },
  ];

  const fetchEquipments = useCallback(() => {
    axios
      .get(`${API_URL}/${EQUIPMENTS_PATH}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        const users = res.data;
        setUser(users);
      });
  }, [userInfo?.accessToken]);

  useEffect(() => {
    fetchEquipments();
    refetchData && fetchEquipments();
  }, [fetchEquipments, refetchData]);

  const handleDeleteEquipment = () => {
    console.log();
    axios
      .delete(`${API_URL}/${EQUIPMENTS_PATH}/${editRow._id}`, {
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
          title="Equipments"
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
                  Equipments
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
                setShowEquipmentModal(true);
              },
            },
          ]}
        />
      </ThemeProvider>

      <ModalComponent
        openModal={showEquipmentModal}
        header={isEdit ? "Edit Equipment" : "New Equipment"}
        content={
          <EquipmentForm
            setShowNoti={(value) => setShowNoti(value)}
            isEdit={isEdit}
            editRow={editRow}
            handleReloadData={(value) => setRefetchData(value)}
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
        header={"Are you sure to delete this item?"}
        content={`Delete Item ${editRow?.name}`}
        handleOK={handleDeleteEquipment}
        handleCloseModal={() => setShowConfirmModal(false)}
      />
    </Container>
  );
};

export default Equipments;
