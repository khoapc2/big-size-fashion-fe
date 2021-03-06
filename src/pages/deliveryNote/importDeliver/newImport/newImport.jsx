/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import "./newImport.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import {
  CREATE_IMPORT_PRODUCT_LIST_FAIL,
  CREATE_IMPORT_PRODUCT_LIST_SUCCESS,
} from "../../../../service/Validations/VarConstant";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { getProductToImportAction } from "../../../../redux/actions/productAction";
import { deliveryImportToMainWareHouseAction } from "../../../../redux/actions/deliverAction";
import { SchemaErrorMessageImportInvoice } from "../../../../service/Validations/ImportInvoiceValidation";
import { triggerReload } from "../../../../redux/actions/userAction";
import { listActiveStore, getMainWareHouseAction } from "../../../../redux/actions/storeAction";
import Loading from "../../../../components/Loading";

let idCounter = 0;
const createRow = ({ product_id, product_name, quantity }) => {
  idCounter += 1;
  return { id: idCounter, product_name: product_name, quantity: quantity, product_id: product_id };
};

export default function CreateImportDeliver() {
  const dispatch = useDispatch();
  const listImportPro = useSelector((state) => state.listImportProduct);
  const response = useSelector((state) => state.createImportDeliver);
  const activeStore = useSelector((state) => state.listActiveStoreDropdown);
  const mainWareHouse = useSelector((state) => state.getMainWareHouse);
  const [rows, setRows] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [deliveryName, setDeliverName] = useState("");
  // const [deliveryName, setDeliverName] = useState("");
  const [storeId, setStoreID] = useState("");
  const apiRef = useRef(null);

  // console.log(rows);
  // const { apiRef, columns } = useApiRef();

  console.log(mainWareHouse);
  // console.log(listImportPro);
  const { success, error } = response;

  useEffect(() => {
    dispatch(getProductToImportAction());
    dispatch(getMainWareHouseAction());
    dispatch(listActiveStore({ status: true }));
  }, [dispatch, triggerReload]);

  useEffect(() => {
    if (success) {
      toast.success("T???o ????n nh???p h??ng th??nh c??ng");
      setSubmit(true);
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("T???o ????n nh???p h??ng th???t b???i, vui l??ng th??? l???i");
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_FAIL, payload: false });
    }
  }, [success, error, triggerReload, dispatch]);

  //

  const onSubmit = (data) => {
    // console.log(data);
    // const {product_name, product_id, quantity} = data
    // dispatch(createAccount(data));
    setDeliverName(data.delivery_note_name);
    setStoreID(data.store_id);
    setRows((prevRows) => [...prevRows, createRow(data)]);
  };

  const handleReset = () => {
    setSubmit(false);
    setRows([]);
  };

  const handleClickButton = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      if (data.size > 0) {
        dispatch(deliveryImportToMainWareHouseAction(data, deliveryName, storeId));
      } else {
        toast.error("B???n ch??a th??m s???n ph???m n??o ????n nh???p h??ng, Vui l??ng th??? l???i");
      }
    } else {
      toast.error("B???n ch??a th??m s???n ph???m n??o ????n nh???p h??ng, Vui l??ng th??? l???i");
    }
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRow()]);
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Ch??a c?? s???n ph???m n??o
      </Stack>
    );
  }

  const columns = [
    {
      field: "product_name",
      headerName: "S???n ph???m",
      flex: 1.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      type: "singleSelect",
    },
    {
      field: "quantity",
      headerName: "S??? l?????ng",
      flex: 0.5,
      disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Thao t??c",
      flex: 0.2,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <div>
          {submit ? (
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newImport">
        <h1 className="createImportTitle">T???o ????n nh???p h??ng</h1>
        <div className="account">
          <div className="accountTop">
            <div className="account-top">
              {mainWareHouse.loading ? (
                <Loading />
              ) : (
                <Formik
                  initialValues={{
                    product_name: "",
                    product_id: "",
                    quantity: "",
                    delivery_note_name: "",
                    store_id: mainWareHouse.store[0].store_id,
                    store_name: mainWareHouse.store[0].store_name,
                  }}
                  onSubmit={onSubmit}
                  validationSchema={SchemaErrorMessageImportInvoice}
                  validateOnBlur
                  validateOnChange
                  onReset={handleReset}
                >
                  {(formik) => {
                    console.log(formik);
                    return (
                      <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <Form.Group className="top-add-product" widths="equal">
                          <Form.Input
                            label="T??n ????n ?????t h??ng"
                            placeholder="T??n ????n ?????t h??ng"
                            type="text"
                            name="delivery_note_name"
                            onChange={formik.handleChange}
                            value={formik.values.delivery_note_name}
                            error={formik.errors.delivery_note_name}
                            disabled={submit}
                          />
                        </Form.Group>
                        <Form.Group className="top-add-product" widths="4">
                          <Form.Select
                            search
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
                            disabled={submit}
                          />
                          <Form.Input
                            fluid
                            label="S??? l?????ng"
                            placeholder="S??? l?????ng"
                            type="number"
                            name="quantity"
                            onChange={formik.handleChange}
                            value={formik.values.quantity}
                            error={formik.errors.quantity}
                            disabled={submit}
                          />
                          <Form.Select
                            search
                            // fluid
                            label="C???a h??ng"
                            options={activeStore.store || []}
                            placeholder="?????n c???a h??ng"
                            name="store_name"
                            onChange={(e, v) => {
                              const { text } = activeStore.store.find((o) => o.value === v.value);
                              formik.setFieldValue("store_id", v.value);
                              formik.setFieldValue("store_name", text);
                            }}
                            value={formik.values.store_id}
                            // error={formik.errors.product_name}
                            text={formik.values.store_name}
                            disabled={submit}
                          />

                          {submit ? (
                            <Form.Button
                              label="."
                              className="button-add-product"
                              type="reset"
                              color="blue"
                            >
                              T???o th??m ????n nh???p h??ng
                            </Form.Button>
                          ) : (
                            <Form.Button
                              label="."
                              className="button-add-product"
                              type="submit"
                              color="green"
                            >
                              Th??m s???n ph???m v??o ????n nh???p h??ng
                            </Form.Button>
                          )}
                        </Form.Group>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </div>
            <div className="accountTopLeft">
              <Box sx={{ width: "100%" }}>
                <Stack direction="row" spacing={1}>
                  {/* <Button size="small" onClick={handleDeleteRow}>
                            Delete a row
                          </Button> */}
                  <Button size="small" onClick={handleAddRow}>
                    Th??m m???i h??ng
                  </Button>
                </Stack>
                {/* <Box sx={{ height: 400, mt: 1 }}>
                          <DataGrid rows={rows} columns={columns} />
                        </Box> */}
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
              </Box>
            </div>
          </div>
          <div className="accountBottom">
            <Form.Button type="submit" color="green" onClick={handleClickButton} disabled={submit}>
              X??c nh???n
            </Form.Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
