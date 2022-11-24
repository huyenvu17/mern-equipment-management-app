import React, { useCallback, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import moment from "moment";
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
  EQUIPMENTS_PATH,
  ISSUE_AND_RETURN,
  USER,
} from "../../utils/constants";
import { getStoredItem, setAuthHeader } from "../../utils/helper";
import ModalComponent from "../../components/Modal";
import Notification from "../../components/Notification";
import Confirmation from "../../components/Confirmation";
import IssueAndReturnForm from "./IssueAndReturnForm";

const IssueAndReturn = () => {
  const userInfo = JSON.parse(getStoredItem(USER));
  const defaultMaterialTheme = createTheme();
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNoti, setShowNoti] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [issues, setIssues] = useState([]);
  const [availableEquipments, setAvailableEquipments] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [loading, setLoading] = useState(false)

  let columns = [
    {
      title: "EQUIPMENT",
      width: "50%",
      field: "equipment",
      render: (row) => {
        return <div>{row?.equipment && availableEquipments?.filter(equipment => row?.equipment?.includes(equipment?._id))?.map(item => item?.name)}</div>
      },
    },
    {
      title: "EMPLOYEE",
      width: "50%",
      render: (row) => <div>{row?.employee && availableEmployees?.find(employee => employee?._id === row?.employee)?.email}</div>,

    },
    {
      title: "BORROW DATE",
      width: "50%",
      render: (row) => <div>{moment(row?.borrowDate).format("DD/MM/YYYY")}</div>,

    },
    {
      title: "RETURN DATE",
      width: "50%",
      render: (row) => <div>{moment(row?.returnedDate).format("DD/MM/YYYY")}</div>,

    },
    {
      title: "STATUS",
      field: "status",
      width: "50%",
    },
  ];
  
  const fetchEquipments = useCallback(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/${EQUIPMENTS_PATH}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        setAvailableEquipments(res?.data);
        setLoading(false)
      });
  }, [userInfo?.accessToken]);

  const fetchEmployees = useCallback(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/${EMPLOYEES_PATH}`,{
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        const employeesData = res.data;
        setAvailableEmployees(employeesData);
        setLoading(false)
      });
  }, [userInfo?.accessToken]);

  const fetchIssueAndReturn = useCallback(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/${ISSUE_AND_RETURN}`, {
        headers: setAuthHeader(userInfo?.accessToken),
      })
      .then((res) => {
        const issuesData = res.data;
        setLoading(false)
        setIssues(issuesData);
      });
  }, [userInfo?.accessToken]);



  useEffect(() => {
    fetchEquipments();
    fetchEmployees();
    fetchIssueAndReturn();
  }, [fetchIssueAndReturn, fetchEmployees, fetchEquipments]);

  const handleDeleteEquipment = () => {
    axios
      .delete(`${API_URL}/${ISSUE_AND_RETURN}/${editRow._id}`, {
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
          title="Issue And Return"
          columns={loading? [] : columns}
          data={issues}
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
                  Issue And Return
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
                setIsEdit(true);
                setEditRow({
                  rowData,
                  employees: availableEmployees,
                  equipments: availableEquipments
                });
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
              onClick: (event, rowData) => {
                setIsEdit(false);
                setEditRow({
                  rowData,
                  employees: availableEmployees,
                  equipments: availableEquipments
                });
                setShowEquipmentModal(true);
              },
            },
          ]}
        />
      </ThemeProvider>

      <ModalComponent
        openModal={showEquipmentModal}
        header={isEdit ? "Edit Issue" : "New Issue"}
        content={
          <IssueAndReturnForm
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
        header={"Are you sure to delete this item?"}
        content={`Delete Item ${editRow?._id}`}
        handleOK={handleDeleteEquipment}
        handleCloseModal={() => setShowConfirmModal(false)}
      />
    </Container>
  );
};

export default IssueAndReturn;
