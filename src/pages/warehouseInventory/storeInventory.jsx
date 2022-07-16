/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import "./storeInventory.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";

import {
  CREATE_IMPORT_PRODUCT_LIST_FAIL,
  CREATE_IMPORT_PRODUCT_LIST_SUCCESS,
} from "../../service/Validations/VarConstant";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { getProductToImportAction } from "../../redux/actions/productAction";
import { getInventoryAction } from "../../redux/actions/inventoryAction";
import { SchemaErrorMessageCheckInventory } from "../../service/Validations/InventoryValidation";
import { triggerReload } from "../../redux/actions/userAction";
import Loading from "../../components/Loading";
import { GET_INVENTORY_PRODUCT_LIST_SUCCESS } from "../../service/Validations/VarConstant";
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

export default function CreateImportDeliver() {
  const apiRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [fromDate, setFromdate] = useState("");
  const [toDate, setTodate] = useState("");
  // console.log(rows);
  // const { apiRef, columns } = useApiRef();

  const dispatch = useDispatch();
  const listImportPro = useSelector((state) => state.listImportProduct);
  const response = useSelector((state) => state.createImportDeliver);
  const { data, loading, list_products } = useSelector((state) => state.listInventoryProduct);

  // const { list_products } = data;

  console.log(data);
  console.log(loading);
  console.log(list_products);

  const { success, error } = response;

  useEffect(() => {
    dispatch(getProductToImportAction());
    dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS, payload: "" });
  }, [dispatch, triggerReload]);

  useEffect(() => {
    if (success) {
      toast.success("Điều chỉnh số lượng trong kho thành công");
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("Điều chỉnh số lượng trong kho thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_FAIL, payload: false });
    }
  }, [success, error, triggerReload, dispatch]);

  //

  const onSubmit = (data) => {
    // console.log(data);
    // const {product_name, product_id, quantity} = data
    // dispatch(createAccount(data));
    setFromdate(formatDate(data.from_date));
    setTodate(formatDate(data.to_date));
    console.log(fromDate);
    console.log(toDate);

    setRows((prevRows) => [...prevRows, createRow(data)]);
  };

  const handleClickButton = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      console.log(data);
      console.log(fromDate);
      console.log(toDate);
      dispatch(getInventoryAction(data, fromDate, toDate));
    } else {
      toast.error("Vui lòng chọn sản phẩm để kiểm kê số lượng");
    }
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRow()]);
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Chưa có sản phẩm nào được chọn để kiểm kê
      </Stack>
    );
  }

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
      field: "real_quantity",
      headerName: "Số lượng",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
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
          {list_products.length > 0 ? (
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
            />
          );
        }
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
                  to_date: "",
                }}
                onSubmit={onSubmit}
                validationSchema={SchemaErrorMessageCheckInventory}
                validateOnBlur
                validateOnChange
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Input
                          name="from_date"
                          fluid
                          label="Từ ngày"
                          placeholder="Ngày"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.from_date}
                          error={formik.errors.from_date}
                        />
                        <Form.Input
                          name="to_date"
                          fluid
                          label="Đến ngày"
                          placeholder="Ngày"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.to_date}
                          error={formik.errors.to_date}
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
                          error={formik.errors.product_name}
                          text={formik.values.product_name}
                        />
                        <Form.Input
                          fluid
                          label="Số lượng"
                          placeholder="Số lượng"
                          type="number"
                          name="real_quantity"
                          onChange={formik.handleChange}
                          value={formik.values.real_quantity}
                          error={formik.errors.real_quantity}
                        />
                        <Form.Button className="button-add-product" type="submit" color="green">
                          Chọn
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
                  <Button size="small" onClick={handleAddRow}>
                    Thêm mới hàng
                  </Button>
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
            {list_products.length > 0 ? (
              <Form.Button type="submit" color="yellow" onClick={handleClickButton}>
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
