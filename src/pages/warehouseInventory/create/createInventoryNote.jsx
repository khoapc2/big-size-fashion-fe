/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./createInventoryNote.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  CREATE_INVENTORY_NOTE_FAIL,
  CREATE_INVENTORY_NOTE_TRIGGER,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS_AFTER_CREATE,
} from "../../../service/Validations/VarConstant";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import {
  createInventoryNoteAction,
  exportExcelAction,
  viewDetailAfterCreateInventoryNoteAction,
} from "../../../redux/actions/inventoryAction";
import { SchemaErrorMessageCreateInventoryNote } from "../../../service/Validations/InventoryNoteValidation";
import Loading from "../../../components/Loading";

const formatDate = (date) => {
  const arrayDate = date.split("-");
  const newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
  return newDate;
};

const formatToDate = (date) => {
  const arrayDate = date.split("/");
  const newDate = `${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`;
  return newDate;
};

const currentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = mm + "/" + dd + "/" + yyyy;
  return formattedToday;
};

export default function CreateImportDeliver() {
  const [rows, setRows] = useState([]);
  // const [flagDisable, setDisable] = useState(false);
  const [flagSubmit, setSubmit] = useState(false);
  // console.log(rows);
  // const { apiRef, columns } = useApiRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createInventoryNote = useSelector((state) => state.createInventoryNote);
  // const listInventoryNoteAfterCreate = useSelector((state) => state.listInventoryNoteAfterCreate);
  const viewDetailInventoryNoteAfterCreate = useSelector(
    (state) => state.viewDetailInventoryNoteAfterCreate
  );

  const { loading } = createInventoryNote;

  console.log(viewDetailInventoryNoteAfterCreate);
  // console.log(viewDetailInventoryNoteAfterCreate);
  // console.log(listInventoryNoteAfterCreate);

  useEffect(() => {
    if (Object.entries(createInventoryNote.data).length !== 0) {
      console.log("Có data");
      dispatch(
        viewDetailAfterCreateInventoryNoteAction(createInventoryNote.data.content.inventory_note_id)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (createInventoryNote.error) {
      toast.error("Lấy danh sách kiểm kê thất bại");
      dispatch({ type: CREATE_INVENTORY_NOTE_FAIL, payload: false });
    }
  }, [dispatch, createInventoryNote.error]);

  const handleExportToExcel = (id) => {
    dispatch(exportExcelAction(id));
  };

  const onSubmit = (data) => {
    setSubmit(true);
    // setDisable(true);
    dispatch(
      createInventoryNoteAction(data, formatDate(data.from_date), formatToDate(data.to_date))
    );
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Chưa có sản phẩm nào được chọn để kiểm kê
      </Stack>
    );
  }

  const handleReset = () => {
    // if (createInventoryNote.data) {
    //
    // }
    dispatch({ type: CREATE_INVENTORY_NOTE_TRIGGER });
    dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS_AFTER_CREATE, payload: "" });
    // setDisable(false);
    setSubmit(false);
  };

  const columns = [
    {
      field: "product_detail_id",
      headerName: "Mã",
      flex: 0.3,
      disableClickEventBubbling: true,
      type: "singleSelect",
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      flex: 1.6,
      disableClickEventBubbling: true,
      type: "singleSelect",
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.product_name}&thinsp; - &thinsp;{params.row.colour}&thinsp; - &thinsp;
          {params.row.size}
        </div>
      ),
    },
    {
      field: "beginning_quantity",
      headerName: "S.lượng đầu kì",
      flex: 0.7,
      disableClickEventBubbling: true,
    },
    {
      field: "ending_quantity",
      headerName: "S.lượng cuối kì",
      flex: 0.7,
      disableClickEventBubbling: true,
    },
    {
      field: "ending_quantity_after_adjusted",
      headerName: "S.lượng Sau khi điều chỉnh",
      flex: 1,
      disableClickEventBubbling: true,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="new-import">
        <div className="create-inventory">
          <div className="create-inventory-top">
            <div className="create-inventory-top">
              <Formik
                initialValues={{
                  inventory_note_name: "",
                  from_date: "",
                  to_date: currentDate(),
                }}
                onReset={handleReset}
                onSubmit={onSubmit}
                validationSchema={SchemaErrorMessageCreateInventoryNote}
                validateOnBlur
                validateOnChange
                handleReset
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Input
                          name="inventory_note_name"
                          fluid
                          label="Tên đơn"
                          placeholder="Tên đơn kiểm kê"
                          type="text"
                          onChange={formik.handleChange}
                          value={
                            Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                              ? viewDetailInventoryNoteAfterCreate.data.content.inventory_note_name
                              : formik.values.inventory_note_name
                          }
                          readOnly={
                            Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                              ? true
                              : false
                          }
                          error={
                            formik.touched.inventory_note_name && formik.errors.inventory_note_name
                              ? formik.errors.inventory_note_name
                              : null
                          }
                        />
                      </Form.Group>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Input
                          name="from_date"
                          fluid
                          label="Từ ngày"
                          placeholder="Ngày"
                          type={`${
                            Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                              ? "input"
                              : "date"
                          }`}
                          onChange={formik.handleChange}
                          value={
                            Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                              ? formatToDate(
                                  viewDetailInventoryNoteAfterCreate.data.content.from_date
                                )
                              : formik.values.from_date
                          }
                          readOnly={
                            Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                              ? true
                              : false
                          }
                          error={
                            (formik.touched.from_date && formik.errors.from_date) ||
                            (formik.touched.to_date && formik.errors.to_date)
                              ? formik.errors.from_date || formik.errors.to_date
                              : null
                          }
                        />
                        <Form.Input
                          name="to_date"
                          fluid
                          label="Ngày hiện hành"
                          placeholder="Ngày"
                          type="input"
                          onChange={formik.handleChange}
                          value={formik.values.to_date}
                          // error={
                          //   formik.touched.to_date && formik.errors.to_date
                          //     ? formik.errors.to_date
                          //     : null
                          // }
                          readOnly
                          // disabled={
                          //   Object.entries(viewDetailInventoryNoteAfterCreate.data).length !== 0
                          //     ? true
                          //     : false
                          // }
                        />
                      </Form.Group>
                      <div className="button-ui">
                        {loading === "end" && (
                          <>
                            <Form.Button
                              label="."
                              // className="choose-button-add-product"
                              type="button"
                              color="green"
                              onClick={() =>
                                handleExportToExcel(
                                  createInventoryNote.data.content.inventory_note_id
                                )
                              }
                            >
                              Xuất Excel
                            </Form.Button>
                            <Form.Button
                              label="."
                              type="button"
                              color="green"
                              onClick={() =>
                                navigate(
                                  `/inventory/${createInventoryNote.data.content.inventory_note_id}`
                                )
                              }
                            >
                              Điều Chỉnh
                            </Form.Button>
                          </>
                        )}
                        {loading === "normal" && (
                          <Form.Button
                            label="."
                            className="choose-button-add-product"
                            type="submit"
                            color="green"
                          >
                            Tạo
                          </Form.Button>
                        )}
                        <Form.Button
                          label="."
                          className="button-add-product"
                          type="reset"
                          color="blue"
                          // onClick={}
                        >
                          Reset
                        </Form.Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div>
              {loading === "normal" && ""}
              {loading === "loading" && (
                <div className="loading-inventory">
                  <Loading />
                </div>
              )}
              {loading === "end" && (
                <div className="create-inventory-top-left">
                  <Box sx={{ width: "100%" }}>
                    <Stack direction="row" spacing={1}>
                      <DataGrid
                        sx={{
                          "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                            outline: "none",
                          },
                          "& .MuiDataGrid-cell:hover": {
                            color: "green",
                          },
                        }}
                        autoHeight
                        getRowId={(r) => r.product_detail_id}
                        rows={
                          viewDetailInventoryNoteAfterCreate
                            ? viewDetailInventoryNoteAfterCreate.data.content.inventory_note_detail
                            : []
                        }
                        loading={viewDetailInventoryNoteAfterCreate.loading}
                        columns={columns}
                        pageSize={10}
                        data={(query) =>
                          new Promise(() => {
                            console.log(query);
                          })
                        }
                        components={{
                          NoRowsOverlay,
                        }}
                        disableColumnFilter={false}
                        disableColumnMenu={false}
                        disableColumnSelector={false}
                      />
                    </Stack>
                  </Box>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
