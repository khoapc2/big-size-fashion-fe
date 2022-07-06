// import { useState } from "react";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  viewDetailOfflineOrder,
  // approveOfflineOrderAction,
} from "../../../redux/actions/orderAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
import "./viewOfflineOrder.css";

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { offlineOrderId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewDetailOfflineOrder);
  const approveOfflineOrder = useSelector((state) => state.approveOfflineOrder);
  const { product_list, store, order_id, create_date } = data;

  console.log(data);
  console.log(approveOfflineOrder);

  useEffect(() => {
    dispatch(viewDetailOfflineOrder(offlineOrderId));
  }, [dispatch, triggerReload]);

  // const handleReset = () => {};

  // const handleSubmit = (data) => {
  //   dispatch(createStore(data));
  // };
  const handleCancel = () => {
    // dispatch(deletePromotion(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleAccept = (id) => {
    console.log(id);
    // dispatch(approveOfflineOrderAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const columns = [
    {
      field: "product_detail_id",
      headerName: "Mã sản phẩm",
      width: 100,
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 350,
      renderCell: (params) => (
        <div className="productListItem">
          <img
            className="productListImg"
            src={params.row.product_image_url}
            alt={params.row.product_name}
          />
          {params.row.product_name}&emsp;&emsp;
          {params.row.category}&emsp;&emsp;
          {params.row.colour}&emsp;&emsp;
          {params.row.size}&emsp;&emsp;
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 150,
      renderCell: (params) => <div>{params.row.price.toLocaleString("vi-VN")}</div>,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 250,
    },
    {
      field: "total_quantity_price",
      headerName: "T.Tiền",
      width: 250,
      renderCell: (params) => (
        <div className="offlineOrderItem">{`${(
          params.row.price * params.row.quantity
        ).toLocaleString("vi-VN")}`}</div>
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
        <div className="offlineOrder">
          <Grid container>
            <Grid item xs={6}>
              <div className="container-title">
                <div className="title">Ngày bán:</div>
                <div className="content">&emsp;{create_date}</div>
              </div>
              <div className="container-title">
                <div className="title">Hóa đơn:</div>
                <div className="content">&emsp;{order_id}</div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="container-title">
                <div className="title">Cửa hàng:</div>
                <div className="content">
                  &emsp;{store.store_name} &emsp; {store.store_phone}
                </div>
              </div>
              <div className="container-title">
                <div className="title">Địa chỉ:</div>
                <div className="content">{store.store_address}</div>
              </div>
            </Grid>
          </Grid>
          <DataGrid
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "green",
              },
            }}
            getRowId={(r) => r.product_detail_id}
            loading={loading}
            rows={product_list}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            data={(query) =>
              new Promise(() => {
                console.log(query);
              })
            }
          />
          <Stack className="bottom-button" direction="row" spacing={2}>
            <Button
              className="deny"
              variant="outlined"
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn có muốn hủy đơn hàng này?",
                  subTitle: "Xác nhận",
                  onConfirm: () => {
                    handleCancel();
                  },
                })
              }
            >
              Hủy
            </Button>
            <Button
              className="approve"
              variant="outlined"
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn có muốn xác nhận đơn hàng này?",
                  subTitle: "Xác nhận",
                  onConfirm: () => {
                    handleAccept(order_id);
                  },
                })
              }
            >
              Xác nhận
            </Button>
          </Stack>
        </div>
      )}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
