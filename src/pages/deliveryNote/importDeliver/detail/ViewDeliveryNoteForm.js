/* eslint-disable */
// import { useState } from "react";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  viewDetailDeliveryNoteAction,
  cancelDeliveryAction,
} from "../../../../redux/actions/deliverAction";
import { triggerReload } from "../../../../redux/actions/userAction";
import Loading from "../../../../components/Loading";
import {
  CANCEL_DELIVERY_NOTE_SUCCESS,
  CANCEL_DELIVERY_NOTE_FAIL,
} from "../../../../service/Validations/VarConstant";
import "./viewDeliveryNote.css";

export default function DeliveryNoteForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { deliveryId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailDeliveryNote);
  const cancelDelivery = useSelector((state) => state.cancelDeliveryState);

  // console.log(data);
  useEffect(() => {
    dispatch(viewDetailDeliveryNoteAction(deliveryId));
  }, [dispatch, triggerReload, cancelDelivery.success, cancelDelivery.error]);

  useEffect(() => {
    if (cancelDelivery.success) {
      toast.success("Hủy thành công");
      dispatch({ type: CANCEL_DELIVERY_NOTE_SUCCESS, payload: false });
    }
    if (cancelDelivery.error) {
      toast.error("Hủy thất bại, vui lòng thử lại");
      dispatch({ type: CANCEL_DELIVERY_NOTE_FAIL, payload: false });
    }
  }, [triggerReload, cancelDelivery.success, cancelDelivery.error]);

  const handleCancel = (id) => {
    dispatch(cancelDeliveryAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const columns = [
    {
      field: "product_id",
      headerName: "Mã sản phẩm",
      width: 100,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.total_quantity_price ? "" : params.row.product_id}
        </div>
      ),
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 500,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.total_quantity_price ? (
            ""
          ) : (
            <img
              className="productListImg"
              src={params.row.image_url}
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
      headerName: "Đơn giá",
      width: 150,
      renderCell: (params) => <div>{params.row.price_per_one.toLocaleString("vi-VN")}</div>,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 200,
    },
    {
      field: "total_quantity_price",
      headerName: "Thành Tiền",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.row.total_quantity_price ? (
            <b>{params.row.total_quantity_price.toLocaleString("vi-VN")}</b>
          ) : (
            ""
          )}
          {params.row.price ? (
            <div className="offlineOrderItem">{`${params.row.price.toLocaleString("vi-VN")}`}</div>
          ) : (
            ""
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
        <div className="onlineOrderTop">
          <div className="buttonCancel">
            {data.status === "Chờ xác nhận" ? (
              <Stack className="bottom-button" direction="row" spacing={2}>
                <Button
                  className="deny"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "Bạn có muốn hủy đơn nhập hàng này?",
                      subTitle: "Xác nhận",
                      onConfirm: () => {
                        handleCancel(deliveryId);
                      },
                    })
                  }
                >
                  Hủy
                </Button>
              </Stack>
            ) : (
              <div />
            )}
          </div>
          <div className="offlineOrderTop">
            <Grid container>
              <Grid item xs={4}>
                <div className="container-title">
                  <div className="title">Tên đơn:</div>
                  <div className="content">&emsp;{data.delivery_note_name}</div>
                </div>

                <div className="container-title">
                  <div className="title">Người Tạo Đơn:</div>
                  <div className="content">&emsp;{data.receive_staff_name}</div>
                </div>
                <div className="container-title">
                  <div className="title">Cửa hàng: </div>
                  <div className="content">&emsp;{data.to_store.store_name}</div>
                </div>
                <div className="container-title">
                  <div className="title">SĐT: </div>
                  <div className="content">&emsp;{data.to_store.store_phone}</div>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="container-title">
                  <div className="title">Ngày tạo:</div>
                  <div className="content">&emsp;{data.create_date}</div>
                </div>
                <div className="container-title">
                  <div className="title">Tới quản lí:</div>
                  <div className="content">&emsp;{data.from_store.manager_name}</div>
                </div>
                <div className="container-title">
                  <div className="title">Cửa hàng nhận yêu cầu: </div>
                  <div className="content">
                    &emsp;{data.from_store.store_name}&emsp; &emsp;<b>SĐT C.hàng yêu cầu: </b>
                    &emsp;{data.from_store.store_phone}
                  </div>
                </div>
                <div className="container-title">
                  <div className="title">Địa chỉ: </div>
                  <div className="content">&emsp; {data.from_store.store_address}</div>
                </div>
              </Grid>
            </Grid>
          </div>
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
