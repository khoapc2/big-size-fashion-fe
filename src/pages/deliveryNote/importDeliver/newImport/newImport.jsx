/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import "./newImport.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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

let idCounter = 0;
const createRow = ({ product_id, product_name, quantity }) => {
  idCounter += 1;
  return { id: idCounter, product_name: product_name, quantity: quantity, product_id: product_id };
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

    // renderCell: (params) => (
    //   <Dropdown
    //     search
    //     selection
    //     options={}
    //     // fluid
    //     // placeholder="Giá"
    //     // type="number"
    //     // name="price"
    //     // widths={50}
    //     // width="2000px"
    //     // onChange={formik.handleChange}
    //     // value={formik.values.price}
    //     // error={formik.errors.price}
    //   />
    // ),
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    flex: 1.0,
    disableClickEventBubbling: true,
    sortable: false,
    disableColumnMenu: true,
  },
  // {
  //   field: "action",
  //   headerName: "Thao tác",
  //   flex: 0.2,
  //   disableClickEventBubbling: true,
  //   disableColumnMenu: true,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <button
  //       onClick={() => {
  //         console.log(params);
  //         console.log("ahihi");
  //         // setRows(rows.filter((e) => e.id !== params.row.id));
  //       }}
  //     >
  //       <ClearIcon />
  //     </button>
  //   ),
  // },
];

function useApiRef() {
  const apiRef = useRef(null);
  const _columns = useMemo(
    () =>
      columns.concat(
        // field: "__HIDDEN__",
        // {
        //   field: "action",
        //   headerName: "Thao tác",
        //   flex: 0.2,
        //   disableClickEventBubbling: true,
        //   disableColumnMenu: true,
        //   sortable: false,
        //   renderCell: (params) => (
        //     <button
        //       onClick={() => {
        //         console.log(params);
        //         // setRows(rows.filter((e) => e.id !== params.row.id));
        //       }}
        //     >
        //       <ClearIcon />
        //     </button>
        //   ),
        // },
        {
          field: "",
          width: 0,
          renderCell: (params) => {
            apiRef.current = params.api;
            return null;
          },
        }
      ),
    [columns]
  );
  return { apiRef, columns: _columns };
}

export default function CreateImportDeliver() {
  const [rows, setRows] = useState([]);
  const [deliveryName, setDeliverName] = useState("");
  // console.log(rows);
  const { apiRef, columns } = useApiRef();

  const dispatch = useDispatch();
  const listImportPro = useSelector((state) => state.listImportProduct);
  const response = useSelector((state) => state.createImportDeliver);

  // console.log(listImportPro);
  const { success, error } = response;

  useEffect(() => {
    dispatch(getProductToImportAction());
  }, [dispatch, triggerReload]);

  useEffect(() => {
    if (success) {
      toast.success("Tạo đơn nhập hàng thành công");
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("Tạo đơn nhập hàng thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_FAIL, payload: false });
    }
  }, [success, error, triggerReload, dispatch]);

  //

  const onSubmit = (data) => {
    // console.log(data);
    // const {product_name, product_id, quantity} = data
    // dispatch(createAccount(data));
    setDeliverName(data.delivery_note_name);
    setRows((prevRows) => [...prevRows, createRow(data)]);
  };

  const handleClickButton = () => {
    // console.log(apiRef);

    const data = apiRef.current.getRowModels();
    dispatch(deliveryImportToMainWareHouseAction(data, deliveryName));
  };

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRow()]);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newImport">
        <h1 className="createImportTitle">Tạo đơn nhập hàng tới kho tổng</h1>

        <div className="account">
          <div className="accountTop">
            <div className="account-top">
              <Formik
                initialValues={{
                  product_name: "",
                  product_id: "",
                  quantity: "",
                  delivery_note_name: "",
                }}
                onSubmit={onSubmit}
                validationSchema={SchemaErrorMessageImportInvoice}
                validateOnBlur
                validateOnChange
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Input
                          label="Tên đơn đặt hàng"
                          placeholder="Tên đơn đặt hàng"
                          type="text"
                          name="delivery_note_name"
                          onChange={formik.handleChange}
                          value={formik.values.delivery_note_name}
                          error={formik.errors.delivery_note_name}
                        />
                      </Form.Group>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Select
                          search
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
                          name="quantity"
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          error={formik.errors.quantity}
                        />
                        <Form.Button className="button-add-product" type="submit" color="green">
                          Thêm sản phẩm vào đơn nhập hàng
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
                />
              </Box>
            </div>
          </div>
          <div className="accountBottom">
            <Form.Button type="submit" color="green" onClick={handleClickButton}>
              Xác nhận
            </Form.Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
