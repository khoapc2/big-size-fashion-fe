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
      toast.error("Ki???m k?? kho th???t b???i, vui l??ng kh??ng ch???n tr??ng s???n ph???m");
      dispatch({ type: GET_INVENTORY_PRODUCT_LIST_FAIL, payload: false });
    } else if (error) {
      toast.error("Ki???m k?? kho th???t b???i, vui l??ng th??? l???i");
      dispatch({ type: GET_INVENTORY_PRODUCT_LIST_FAIL, payload: false });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (response.success) {
      toast.success("??i???u ch???nh s??? l?????ng trong kho th??nh c??ng");
      dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS, payload: false });
      if (apiRef.current) {
        const data = apiRef.current.getRowModels();
        dispatch(getInventoryAction(data, fromDate, toDate));
      }
    }
    if (response.error) {
      toast.error("??i???u ch???nh s??? l?????ng trong kho th???t b???i, vui l??ng th??? l???i");
      dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_FAIL, payload: false });
    }
  }, [response.success, response.error, dispatch]);

  //

  const onSubmit = (data) => {
    // console.log(data);
    // const {product_name, product_id, quantity} = data
    // dispatch(createAccount(data));
    setFromdate(formatDate(data.from_date));
    setTodate(formatDate(data.to_date));
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
        toast.error("Vui l??ng ch???n s???n ph???m ????? ki???m k?? s??? l?????ng");
      }
    } else {
      toast.error("Vui l??ng ch???n s???n ph???m ????? ki???m k?? s??? l?????ng");
    }
  };

  const handleClickAdjusment = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      dispatch(quantityAdjusmentAction(data));
    } else {
      toast.error("C???p nh???t s??? l?????ng s???n ph???m th???t b???i, vui l??ng th??? l???i sau");
    }
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Ch??a c?? s???n ph???m n??o ???????c ch???n ????? ki???m k??
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
      headerName: "S???n ph???m",
      flex: 1.0,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      type: "singleSelect",
    },
    {
      field: "beginning_quantity",
      headerName: "S??? l?????ng ?????u k??",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "ending_quantity_in_system",
      headerName: "S??? l?????ng cu???i k??",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "real_quantity",
      headerName: "S??? l?????ng Th???c T???",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "difference_quantity",
      headerName: "Ch??nh l???ch",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          {params.row.difference_quantity < 0
            ? `Thi???u ${params.row.difference_quantity.toString().split("-")[1]}`
            : ""}
          {params.row.difference_quantity > 0 ? `D?? ${params.row.difference_quantity}` : ""}
          {params.row.difference_quantity === 0 ? `${params.row.difference_quantity}` : ""}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Thao t??c",
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
        <h1 className="createImportTitle">Ki???m k?? kho</h1>
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
                          label="T??? ng??y"
                          placeholder="Ng??y"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.from_date}
                          error={formik.errors.from_date}
                          disabled={data ? true : false}
                        />
                        <Form.Input
                          name="to_date"
                          fluid
                          label="?????n ng??y"
                          placeholder="Ng??y"
                          type="date"
                          onChange={formik.handleChange}
                          value={formik.values.to_date}
                          error={formik.errors.to_date}
                          disabled={data ? true : false}
                        />
                      </Form.Group>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Select
                          fluid
                          label="S???n ph???m"
                          options={listImportPro.data || []}
                          placeholder="S???n ph???m"
                          name="product_name"
                          onChange={(e, v) => {
                            const { text } = listImportPro.data.find((o) => o.value === v.value);
                            formik.setFieldValue("product_id", v.value);
                            formik.setFieldValue("product_name", text);
                          }}
                          value={formik.values.product_name}
                          error={formik.errors.product_name}
                          text={formik.values.product_name}
                          disabled={data ? true : false}
                        />
                        <Form.Input
                          fluid
                          label="S??? l?????ng"
                          placeholder="S??? l?????ng"
                          type="number"
                          name="real_quantity"
                          onChange={formik.handleChange}
                          value={formik.values.real_quantity}
                          error={formik.errors.real_quantity}
                          disabled={data ? true : false}
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
                            Ch???n
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
                ??i???u ch???nh
              </Form.Button>
            ) : (
              <Form.Button type="submit" color="green" onClick={handleClickButton}>
                Ki???m k??
              </Form.Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
