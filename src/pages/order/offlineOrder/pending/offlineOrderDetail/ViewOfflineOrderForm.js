/* eslint-disable */
// import { useState } from "react";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  viewDetailOfflineOrderAction,
  approveOfflineOrderAction,
  cancelOfflineOrderAction,
  exportExcelAction,
} from "../../../../../redux/actions/orderAction";
import { triggerReload } from "../../../../../redux/actions/userAction";
import Loading from "../../../../../components/Loading";
import "./viewOfflineOrder.css";
import {
  APPROVE_OFFLINE_ORDER_SUCCESS,
  APPROVE_OFFLINE_ORDER_FAIL,
  CANCEL_OFFLINE_ORDER_SUCCESS,
  CANCEL_OFFLINE_ORDER_FAIL,
} from "../../../../../service/Validations/VarConstant";

// const createRow = (productList) => {
//   let totalPrice = 0;
//   productList.forEach(({ discount_price_per_one, quantity, price_per_one }) => {
//     if (discount_price_per_one) {
//       totalPrice += discount_price_per_one * quantity;
//     } else {
//       totalPrice += price_per_one * quantity;
//     }
//   });
//   return { total_quantity_price: totalPrice };
// };

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { offlineOrderId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailOfflineOrder);
  const zaloPay = useSelector((state) => state.getZaloLink);
  const approveOffOrder = useSelector((state) => state.approveOfflineOrder);
  const rejectOffOrder = useSelector((state) => state.rejectOfflineOrder);
  const { store, order_id, create_date, status, payment_method, customer_name, staff_name } = data;

  // console.log(setRow(...product_list, createRow(row)));

  // const row = [...product_list, totalPrice];
  // console.log(row);

  console.log(data);
  console.log(totalProduct);
  console.log(zaloPay.data);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(viewDetailOfflineOrderAction(offlineOrderId));
  }, [dispatch, triggerReload, reload]);

  useEffect(() => {
    if (approveOffOrder.success) {
      setReload(true);
      toast.success("Duy???t ????n h??ng th??nh c??ng");
      dispatch({ type: APPROVE_OFFLINE_ORDER_SUCCESS, payload: false });
    }
    if (approveOffOrder.error) {
      toast.error("Duy???t ????n h??ng th???t b???i, vui l??ng th??? l???i");
      dispatch({ type: APPROVE_OFFLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, approveOffOrder.success, approveOffOrder.error]);

  useEffect(() => {
    if (rejectOffOrder.success) {
      setReload(true);
      toast.success("T??? ch???i ????n th??nh c??ng");
      dispatch({ type: CANCEL_OFFLINE_ORDER_SUCCESS, payload: false });
    }
    if (rejectOffOrder.error) {
      toast.error("T??? ch???i ????n th???t b???i, vui l??ng th??? l???i");
      dispatch({ type: CANCEL_OFFLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, rejectOffOrder.success, rejectOffOrder.error]);

  const handleReject = (id) => {
    dispatch(cancelOfflineOrderAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleAccept = (id) => {
    dispatch(approveOfflineOrderAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };
  const handleExportOrder = (id) => {
    dispatch(exportExcelAction(id));
  };

  const columns = [
    {
      field: "product_id",
      headerName: "M?? s???n ph???m",
      width: 100,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.total_quantity_price ? "" : params.row.product_id}
        </div>
      ),
    },
    {
      field: "product_name",
      headerName: "S???n ph???m",
      width: 500,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.total_quantity_price ? (
            ""
          ) : (
            <img
              className="productListImg"
              src={params.row.product_image_url}
              alt={params.row.product_name}
            />
          )}
          {params.row.product_name}&emsp;&emsp;
          {params.row.category}&emsp;&emsp;
          {params.row.colour}&emsp;&emsp;
          {params.row.size}&emsp;&emsp;
        </div>
      ),
    },
    {
      field: "price",
      headerName: "????n gi??",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.discount_price_per_one ? (
            <div>
              <del>{params.row.price_per_one.toLocaleString("vi-VN")}</del>&emsp;
              {params.row.discount_price_per_one.toLocaleString("vi-VN")}
            </div>
          ) : (
            <div>{params.row.price_per_one.toLocaleString("vi-VN")}</div>
          )}
        </div>
      ),
    },
    {
      field: "quantity",
      headerName: "S??? l?????ng",
      width: 200,
    },
    {
      field: "total_quantity_price",
      headerName: "Th??nh Ti???n",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.row.total_quantity_price ? (
            <b>{params.row.total_quantity_price.toLocaleString("vi-VN")}</b>
          ) : (
            ""
          )}
          {params.row.discount_price ? (
            <div className="offlineOrderItem">{`${params.row.discount_price.toLocaleString(
              "vi-VN"
            )}`}</div>
          ) : (
            <div className="offlineOrderItem">{`${params.row.price.toLocaleString("vi-VN")}`}</div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="offlineOrderTop">
          <div className="buttonApprove">
            {status === "Ch??? x??c nh???n" ? (
              <Stack className="bottom-button" direction="row" spacing={2}>
                <Button
                  className="approve"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "B???n c?? mu???n x??c nh???n ????n h??ng n??y?",
                      subTitle: "X??c nh???n",
                      onConfirm: () => {
                        handleAccept(order_id);
                      },
                    })
                  }
                >
                  X??c nh???n
                </Button>
                <Button
                  className="deny"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "B???n c?? mu???n h???y ????n h??ng n??y?",
                      subTitle: "X??c nh???n",
                      onConfirm: () => {
                        handleReject(order_id);
                      },
                    })
                  }
                >
                  T??? ch???i
                </Button>
              </Stack>
            ) : (
              <></>
            )}
            {status === "???? nh???n h??ng" ? (
              <Button
                className="approve"
                variant="outlined"
                onClick={() => handleExportOrder(order_id)}
              >
                Xu???t h??a ????n
              </Button>
            ) : (
              <></>
            )}
          </div>

          <Grid container>
            <Grid item xs={4}>
              <div className="container-title">
                <div className="title">Ng??y b??n:</div>
                <div className="content">&emsp;{create_date}</div>
              </div>
              <div className="container-title">
                <div className="title">H??a ????n:</div>
                <div className="content">&emsp;{order_id}</div>
              </div>
              <div className="container-title">
                <div className="title">T??n Kh??ch h??ng:</div>
                <div className="content">&emsp;{customer_name}</div>
              </div>
              <div className="container-title">
                <div className="title">Ph????ng th???c thanh to??n:</div>
                {zaloPay.data ? (
                  <a href={zaloPay.data.order_url} target="_blank">
                    &emsp;{payment_method}
                  </a>
                ) : (
                  <div className="content">&emsp;{payment_method}</div>
                )}
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="container-title">
                <div className="title">T??n Nh??n vi??n:</div>
                <div className="content">&emsp;{staff_name}</div>
              </div>
              <div className="container-title">
                <div className="title">C???a h??ng: </div>
                <div className="content">&emsp;{store.store_name}</div>
              </div>
              <div className="container-title">
                <div className="title">S??T: </div>
                <div className="content"> &emsp; {store.store_phone}</div>
              </div>
              <div className="container-title">
                <div className="title">?????a ch???: </div>
                <div className="content">&emsp; {store.store_address}</div>
              </div>
            </Grid>
          </Grid>

          <div className="offlineOrderTopLeft">
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
              loading={loading}
              rows={totalProduct}
              disableSelectionOnClick
              columns={columns}
              pageSize={10}
              data={(query) =>
                new Promise(() => {
                  console.log(query);
                })
              }
            />
          </div>
        </div>
      )}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
