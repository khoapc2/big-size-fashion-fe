/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import "./storeInventory.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";

import {
  ADD_PRODUCT_TO_PROMOTION_FAIL,
  ADD_PRODUCT_TO_PROMOTION_SUCCESS,
} from "../../../../service/Validations/VarConstant";
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import {
  getProductToAddPromotion,
  addProductToPromotion,
} from "../../../../redux/actions/promotionAction";
import { triggerReload } from "../../../../redux/actions/userAction";
import { SchemaErrorMessageAddProductToPromotion } from "../../../../service/Validations/AddProductToPromotionValidation";
import Loading from "../../../../components/Loading";
let idCounter = 0;
const createRow = ({ product_id, product_name }) => {
  idCounter += 1;
  return {
    id: idCounter,
    product_name: product_name,
    product_id: product_id,
  };
};

export default function AddProductToPromotionForm() {
  const apiRef = useRef(null);
  const [rows, setRows] = useState([]);
  const { promotionId } = useParams();

  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const listProducts = useSelector((state) => state.listProductsToAddPromotionState);
  const { error, success, loading } = useSelector((state) => state.addProductToPromotionState);
  useEffect(() => {
    dispatch(getProductToAddPromotion());
  }, [dispatch, triggerReload]);

  useEffect(() => {
    if (
      typeof error === "string" &&
      error.includes("Trùng sản phẩm")
    ) {
      toast.error("Thêm thất bại, vui lòng không chọn sản phẩm trùng");
      dispatch({ type: ADD_PRODUCT_TO_PROMOTION_FAIL, payload: false });
    } else if (error) {
      toast.error("Thêm thất bại, vui lòng thử lại");
      dispatch({ type: ADD_PRODUCT_TO_PROMOTION_FAIL, payload: false });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      if (success.length === 0) {
        toast.success("Thêm sản phẩm khuyến mại thành công");
        dispatch({ type: ADD_PRODUCT_TO_PROMOTION_FAIL, payload: false });
      } else if (success.length > 0) {
        console.log(success);
        toast.error("Thêm sản phẩm khuyến mại thất bại, có sản phẩm đang có khuyến mại");
        dispatch({ type: ADD_PRODUCT_TO_PROMOTION_FAIL, payload: false });
      }
    }
  }, [dispatch, success]);

  //

  const onSubmit = (data) => {
    setRows((prevRows) => [...prevRows, createRow(data)]);
  };

  const handleClickButton = () => {
    if (apiRef.current) {
      const data = apiRef.current.getRowModels();
      if (data.size > 0) {
        dispatch(addProductToPromotion(promotionId, data));
      } else {
        toast.info("Vui lòng chọn sản phẩm để thêm khuyến mại");
      }
    } else {
      toast.info("Vui lòng chọn sản phẩm để thêm khuyến mại");
    }
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Chưa có sản phẩm nào được chọn để thêm vào khuyến mại
      </Stack>
    );
  }

  const handleReset = () => {
    setSubmit(false);
    setRows([]);
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
      field: "action",
      headerName: "Thao tác",
      flex: 0.3,
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
        <h1 className="createImportTitle">Thêm sản phẩm khuyến mại</h1>
        <div className="account">
          <div className="accountTop">
            <div className="account-top">
              <Formik
                initialValues={{
                  product_id: "",
                }}
                onReset={handleReset}
                onSubmit={onSubmit}
                validationSchema={SchemaErrorMessageAddProductToPromotion}
                validateOnBlur
                validateOnChange
                handleReset
              >
                {(formik) => {
                  return (
                    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                      <Form.Group className="top-add-product" widths="equal">
                        <Form.Select
                          search
                          fluid
                          label="Sản phẩm"
                          options={listProducts.data || []}
                          placeholder="Sản phẩm"
                          name="product_name"
                          onChange={(e, v) => {
                            const { text } = listProducts.data.find((o) => o.value === v.value);
                            formik.setFieldValue("product_id", v.value);
                            formik.setFieldValue("product_name", text);
                          }}
                          value={formik.values.product_name}
                          error={formik.errors.product_name}
                          text={formik.values.product_name}
                          disabled={submit}
                        />
                        {submit ? (
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
              Xác nhận
            </Form.Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
