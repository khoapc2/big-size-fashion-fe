/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import "./storeInventory.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";

import {
  QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS,
  QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
  GET_INVENTORY_PRODUCT_LIST_FAIL,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS,
} from "../../service/Validations/VarConstant";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { getProductToImportAction } from "../../redux/actions/productAction";
import { getInventoryAction, quantityAdjusmentAction } from "../../redux/actions/inventoryAction";
import { SchemaErrorMessageCheckInventory } from "../../service/Validations/InventoryValidation";
import Loading from "../../components/Loading";
let idCounter = 0;
const createRow = ({ product_id, product_name, real_quantity }) => {
  idCounter += 1;
  return {
    id: idCounter,
    product_name: product_name,
    real_quantity: real_quantity,
    product_id: product_id,
  };
};

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
  const apiRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");
  // console.log(rows);
  // const { apiRef, columns } = useApiRef();

  const dispatch = useDispatch();
  const listImportPro = useSelector((state) => state.listImportProduct);
  const response = useSelector((state) => state.quantityAjustment);
  let { data, loading, list_products, error } = useSelector((state) => state.listInventoryProduct);

  // console.log(currentDate());
  // const { list_products } = data;

  // console.log(data);
  // console.log(loading);
  // console.log(list_products);

  // const { success, error } = response;

  useEffect(() => {
    dispatch(getProductToImportAction());
    dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS, payload: "" });
  }, [dispatch]);

  useEffect(() => {
    if (
      typeof error === "string" &&
      error.includes("An item with the same key has already been added")
    ) {
      toast.error("Kiểm kê kho thất bại, vui lòng không chọn trùng sản phẩm");
      dispatch({ type: GET_INVENTORY_PRODUCT_LIST_FAIL, payload: false });
    } else if (error) {
      toast.error("Kiểm kê kho thất bại, vui lòng thử lại");
      dispatch({ type: GET_INVENTORY_PRODUCT_LIST_FAIL, payload: false });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (response.success) {
      toast.success("Điều chỉnh số lượng trong kho thành công");
      dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS, payload: false });
      if (apiRef.current) {
        const data = apiRef.current.getRowModels();
        dispatch(getInventoryAction(data, fromDate, toDate));
      }
    }
    if (response.error) {
      toast.error("Điều chỉnh số lượng trong kho thất bại, vui lòng thử lại");
      dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_FAIL, payload: false });
    }
  }, [response.success, response.error, dispatch]);

  //

  const onSubmit = (data) => {
    console.log(data);
    // const {product_name, product_id, quantity} = data
    // dispatch(createAccount(data));
    setFromdate(formatDate(data.from_date));
    setTodate(formatToDate(data.to_date));
    // console.log(fromDate);
    // console.log(toDate);

    setRows((prevRows) => [...prevRows, createRow(data)]);
  };

  const handleClickButton = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      if (data.size > 0) {
        dispatch(getInventoryAction(data, fromDate, toDate));
      } else {
        toast.error("Vui lòng chọn sản phẩm để kiểm kê số lượng");
      }
    } else {
      toast.error("Vui lòng chọn sản phẩm để kiểm kê số lượng");
    }
  };

  const handleClickAdjusment = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      dispatch(quantityAdjusmentAction(data));
    } else {
      toast.error("Cập nhật số lượng sản phẩm thất bại, vui lòng thử lại sau");
    }
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Chưa có sản phẩm nào được chọn để kiểm kê
      </Stack>
    );
  }

  const handleReset = () => {
    apiRef.current = null;
    if (data) {
      dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS, payload: "" });
    }
    if (rows) {
      setRows([]);
    }
  };

  const columns = [
    {
      field: "product_name",
      headerName: "Sản phẩm",
      flex: 1.0,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      type: "singleSelect",
    },
    {
      field: "beginning_quantity",
      headerName: "Số lượng đầu kì",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "ending_quantity_in_system",
      headerName: "Số lượng cuối kì",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "real_quantity",
      headerName: "Số lượng Thực Tế",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "difference_quantity",
      headerName: "Chênh lệch",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          {params.row.difference_quantity < 0
            ? `Thiếu ${params.row.difference_quantity.toString().split("-")[1]}`
            : ""}
          {params.row.difference_quantity > 0 ? `Dư ${params.row.difference_quantity}` : ""}
          {params.row.difference_quantity === 0 ? `${params.row.difference_quantity}` : ""}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Thao tác",
      flex: 0.3,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <div>
          {list_products && list_products.length > 0 ? (
            ""
          ) : (
            <button
              onClick={() => {
                setRows(rows.filter((e) => e.id !== params.row.id));
              }}
            >
              <ClearIcon />
            </button>
          )}
        </div>
      ),
    },
    {
      field: "",
      width: 0,
      renderCell: (params) => {
        apiRef.current = params.api;
        return null;
      },
    },
  ];

  const renderTable = () => {
    if (data) {
      switch (data.length) {
        case 0:
          return (
            <DataGrid
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell:hover": {
                  color: "green",
                },
              }}
              // loading={loading}
              getRowId={(r) => r.id}
              rows={rows}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              data={(query) =>
                new Promise(() => {
                  console.log(query);
                })
              }
              autoHeight
              components={{
                NoRowsOverlay,
              }}
            />
          );
        default:
          if (loading) {
            return <Loading />;
          } else {
            return (
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
                loading={loading}
                getRowId={(r) => r.id}
                rows={list_products}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                data={(query) =>
                  new Promise(() => {
                    console.log(query);
                  })
                }
                components={{
                  NoRowsOverlay,
                }}
              />
            );
          }
      }
    } else {
      return (
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "green",
            },
          }}
          // loading={loading}
          getRowId={(r) => r.id}
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          data={(query) =>
            new Promise(() => {
              console.log(query);
            })
          }
          autoHeight
          components={{
            NoRowsOverlay,
          }}
        />
      );
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newImport">
        <h1 className="createImportTitle">Kiểm kê kho</h1>
        <div className="account">
          <div className="accountTop">
            <div className="account-top">
              <Formik
                initialValues={{
                  product_id: "",
                  real_quantity: "",
                  from_date: "",
                  to_date: currentDate(),
                }}
                onReset={handleReset}
                onSubmit={onSubmit}
                validationSchema={SchemaErrorMessageCheckInventory}
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
                          name="from_date"
                          fluid
                          label="Từ ngày"
                          placeholder="Ngày"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.from_date}
                          readOnly={data ? true : false}
                          error={
                            formik.touched.from_date && formik.errors.from_date
                              ? formik.errors.from_date
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
                          error={
                            formik.touched.to_date && formik.errors.to_date
                              ? formik.errors.to_date
                              : null
                          }
                          readOnly={data ? true : false}
                        />
                      </Form.Group>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Select
                          fluid
                          label="Sản phẩm"
                          options={listImportPro.data || []}
                          placeholder="Sản phẩm"
                          name="product_name"
                          onChange={(e, v) => {
                            const { text } = listImportPro.data.find((o) => o.value === v.value);
                            formik.setFieldValue("product_id", v.value);
                            formik.setFieldValue("product_name", text);
                          }}
                          value={formik.values.product_name}
                          error={
                            formik.touched.product_name && formik.errors.product_name
                              ? formik.errors.product_name
                              : null
                          }
                          text={formik.values.product_name}
                          readOnly={data ? true : false}
                        />
                        <Form.Input
                          fluid
                          label="Số lượng"
                          placeholder="Số lượng"
                          type="number"
                          name="real_quantity"
                          onChange={formik.handleChange}
                          value={formik.values.real_quantity}
                          readOnly={data ? true : false}
                          error={
                            formik.touched.real_quantity && formik.errors.real_quantity
                              ? formik.errors.real_quantity
                              : null
                          }
                        />
                        {data ? (
                          ""
                        ) : (
                          <Form.Button
                            label="."
                            className="choose-button-add-product"
                            type="submit"
                            color="green"
                          >
                            Chọn
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
                      </Form.Group>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className="accountTopLeft">
              <Box sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1}>
                  {/* <Button size="small" onClick={handleDeleteRow}>
                            Delete a row
                          </Button> */}
                </Stack>
                {/* <Box sx={{ height: 400, mt: 1 }}>
                          <DataGrid rows={rows} columns={columns} />
                        </Box> */}
                {/* <DataGrid
                  sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                      outline: "none",
                    },
                    "& .MuiDataGrid-cell:hover": {
                      color: "green",
                    },
                  }}
                  // loading={loading}
                  getRowId={(r) => r.product_id}
                  rows={list_products}
                  disableSelectionOnClick
                  columns={columns}
                  pageSize={8}
                  data={(query) =>
                    new Promise(() => {
                      console.log(query);
                    })
                  }
                /> */}
                {renderTable()}
              </Box>
            </div>
          </div>
          <div className="accountBottom">
            {list_products && list_products.length > 0 ? (
              <Form.Button type="submit" color="yellow" onClick={handleClickAdjusment}>
                Điều chỉnh
              </Form.Button>
            ) : (
              <Form.Button type="submit" color="green" onClick={handleClickButton}>
                Kiểm kê
              </Form.Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
