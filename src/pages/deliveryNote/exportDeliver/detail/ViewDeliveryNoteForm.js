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
import TableDialog from "pages/deliveryNote/exportDelivery_admin/detail/dialogTable";
import {
  viewDetailDeliveryNoteAction,
  approveDeliveryAction,
  rejectDeliveryAction,
} from "../../../../redux/actions/deliverAction";
import { triggerReload } from "../../../../redux/actions/userAction";
import Loading from "../../../../components/Loading";
import "./viewDeliveryNote.css";
import {
  APPROVE_DELIVERY_NOTE_SUCCESS,
  APPROVE_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_SUCCESS,
} from "../../../../service/Validations/VarConstant";

export default function DeliveryNoteForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  const [tableDialog, setTableDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    data: [],
  });
  const { deliveryId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailDeliveryNote);
  const approveDelivery = useSelector((state) => state.approveDeliveryState);
  const rejectDelivery = useSelector((state) => state.rejectDeliveryState);

  console.log(data);

  useEffect(() => {
    dispatch(viewDetailDeliveryNoteAction(deliveryId));
  }, [dispatch, triggerReload, approveDelivery.success, approveDelivery.error]);

  useEffect(() => {
    if (approveDelivery.success) {
      if (approveDelivery.success.is_success && !approveDelivery.success.content) {
        console.log(approveDelivery);
        toast.success("Duyệt đơn hàng thành công");
        dispatch({ type: APPROVE_DELIVERY_NOTE_SUCCESS, payload: false });
      } else if (approveDelivery.success.is_success && approveDelivery.success.content) {
        console.log(approveDelivery.success.content);
        setTableDialog({
          isOpen: true,
          title: "Yêu cầu nhập hàng không thành công?",
          subTitle: "Có sản phẩm vượt số lượng trong kho",
          data: approveDelivery.success.content,
        });
        toast.error("Duyệt thất bại, có sản phẩm vượt số lượng trong kho");
        dispatch({ type: APPROVE_DELIVERY_NOTE_SUCCESS, payload: false });
      }
    }
    if (approveDelivery.error) {
      toast.error("Duyệt đơn xuất hàng thất bại, vui lòng thử lại");
      dispatch({ type: APPROVE_DELIVERY_NOTE_FAIL, payload: false });
    }
  }, [
    triggerReload,
    approveDelivery.success,
    approveDelivery.error,
    rejectDelivery.success,
    rejectDelivery.error,
  ]);

  useEffect(() => {
    if (rejectDelivery.success) {
      toast.success("Từ chối đơn xuất hàng thành công");
      dispatch({ type: REJECT_DELIVERY_NOTE_SUCCESS, payload: false });
    }
    if (rejectDelivery.error) {
      toast.error("Từ chối đơn xuất hàng thất bại, vui lòng thử lại");
      dispatch({ type: REJECT_DELIVERY_NOTE_FAIL, payload: false });
    }
  }, [triggerReload, rejectDelivery.success, rejectDelivery.error]);

  const handleReject = (id) => {
    dispatch(rejectDeliveryAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleAccept = (id) => {
    dispatch(approveDeliveryAction(id));
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
      width: 130,
      renderCell: (params) => <div>{params.row.price_per_one.toLocaleString("vi-VN")}</div>,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 100,
    },
    {
      field: "total_quantity_price",
      headerName: "Thành Tiền",
      width: 110,
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

  const columnsPendingOrder = [
    {
      field: "product_id",
      headerName: "Mã",
      width: 50,
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
      width: 130,
      renderCell: (params) => <div>{params.row.price_per_one.toLocaleString("vi-VN")}</div>,
    },
    {
      field: "quantity",
      headerName: "S.Lượng",
      width: 100,
    },
    {
      field: "current_quantity",
      headerName: "S.Lượng Trong Kho",
      width: 150,
    },
    {
      field: "total_quantity_price",
      headerName: "Thành Tiền",
      width: 100,
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
        <div className="offlineOrderTop">
          <div className="buttonApprove">
            {data.status === "Chờ xác nhận" ? (
              <Stack className="bottom-button" direction="row" spacing={2}>
                <Button
                  className="approve"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "Bạn có muốn xác nhận yêu cầu nhập hàng này?",
                      subTitle: "Xác nhận",
                      onConfirm: () => {
                        handleAccept(deliveryId);
                      },
                    })
                  }
                >
                  Xác nhận
                </Button>
                <Button
                  className="deny"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "Bạn có muốn hủy yêu cầu nhập hàng này?",
                      subTitle: "Hủy",
                      onConfirm: () => {
                        handleReject(deliveryId);
                      },
                    })
                  }
                >
                  Từ chối
                </Button>
              </Stack>
            ) : (
              <></>
            )}
          </div>
          <Grid container>
            <Grid item xs={6}>
              <div className="container-title">
                <div className="title">Tên đơn:</div>
                <div className="content">&emsp;{data.delivery_note_name}</div>
              </div>
              <div className="container-title">
                <div className="title">Từ chi nhánh:</div>
                <div className="content">&emsp;{data.to_store.store_name}</div>
              </div>
              <div className="container-title">
                <div className="title">Người Tạo Đơn:</div>
                <div className="content">&emsp;{data.receive_staff_name}</div>
              </div>

              <div className="container-title">
                <div className="title">Ngày tạo:</div>
                <div className="content">&emsp;{data.create_date}</div>
              </div>

              <div className="container-title">
                <div className="title">Địa chỉ chi nhánh:</div>
                <div className="content">&emsp;{data.to_store.store_address}</div>
              </div>
              <div className="container-title">
                <div className="title">Ngày tạo:</div>
                <div className="content">&emsp;{data.to_store.store_phone}</div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="container-title">
                <div className="title">Đến Cửa hàng: </div>
                <div className="content">&emsp;{data.from_store.store_name}</div>
              </div>
              <div className="container-title">
                <div className="title">Quản lí: </div>
                <div className="content">&emsp;{data.from_store.manager_name}</div>
              </div>
              <div className="container-title">
                <div className="title">SĐT: </div>
                <div className="content"> &emsp; {data.from_store.store_phone}</div>
              </div>
              <div className="container-title">
                <div className="title">Địa chỉ: </div>
                <div className="content">&emsp; {data.to_store.store_address}</div>
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
              columns={data.status === "Chờ xác nhận" ? columnsPendingOrder : columns}
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
      <TableDialog confirmDialog={tableDialog} setConfirmDialog={setTableDialog} />
    </div>
  );
}
