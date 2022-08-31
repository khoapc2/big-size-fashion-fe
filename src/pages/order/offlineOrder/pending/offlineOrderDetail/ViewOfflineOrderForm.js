/* eslint-disable */
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { Form } from "semantic-ui-react";
import CachedIcon from "@mui/icons-material/Cached";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import TableDialog from "pages/deliveryNote/exportDelivery_admin/detail/dialogTable";
import {
  viewDetailOfflineOrderAction,
  approveOfflineOrderAction,
  cancelOfflineOrderAction,
  exportExcelAction,
  changePaymentMethodAction,
} from "../../../../../redux/actions/orderAction";
import { triggerReload } from "../../../../../redux/actions/userAction";
import Loading from "../../../../../components/Loading";
import "./viewOfflineOrder.css";
import {
  APPROVE_OFFLINE_ORDER_SUCCESS,
  APPROVE_OFFLINE_ORDER_FAIL,
  CANCEL_OFFLINE_ORDER_SUCCESS,
  CANCEL_OFFLINE_ORDER_FAIL,
  CHANGE_PAYMENT_METHOD_SUCCESS,
  CHANGE_PAYMENT_METHOD_FAIL,
} from "../../../../../service/Validations/VarConstant";

const options = [
  { key: "1", text: "Tiền mặt", value: "Tiền mặt" },
  { key: "0", text: "ZaloPay", value: "ZaloPay" },
];

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  const [payMethod, setPaymethod] = useState("");
  const [tableDialog, setTableDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    data: [],
  });
  const { offlineOrderId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailOfflineOrder);
  const zaloPay = useSelector((state) => state.getZaloLink);
  const approveOffOrder = useSelector((state) => state.approveOfflineOrder);
  const rejectOffOrder = useSelector((state) => state.rejectOfflineOrder);
  const changePaymentMethod = useSelector((state) => state.changePaymentMethod);
  const { store, order_id, create_date, status, payment_method, customer_name, staff_name } = data;

  console.log(changePaymentMethod);
  console.log(totalProduct);
  useEffect(() => {
    dispatch(viewDetailOfflineOrderAction(offlineOrderId, "offline"));
  }, [
    dispatch,
    triggerReload,
    approveOffOrder.success,
    approveOffOrder.error,
    rejectOffOrder.success,
    rejectOffOrder.error,
    changePaymentMethod.success,
  ]);

  useEffect(() => {
    if (approveOffOrder.success) {
      if (approveOffOrder.success.is_success && !approveOffOrder.success.content) {
        console.log(approveOffOrder);
        toast.success("Duyệt đơn hàng thành công");
        dispatch({ type: APPROVE_OFFLINE_ORDER_SUCCESS, payload: false });
      } else if (approveOffOrder.success.is_success && approveOffOrder.success.content) {
        console.log(approveOffOrder.success.content);
        setTableDialog({
          isOpen: true,
          title: "Yêu cầu nhập hàng không thành công?",
          subTitle: "Có sản phẩm vượt số lượng trong kho",
          data: approveOffOrder.success.content,
        });
        toast.error("Duyệt thất bại, có sản phẩm vượt số lượng trong kho");
        dispatch({ type: APPROVE_OFFLINE_ORDER_SUCCESS, payload: false });
      }
    }
    if (approveOffOrder.error) {
      toast.error("Duyệt đơn hàng thất bại, vui lòng thử lại");
      dispatch({ type: APPROVE_OFFLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, approveOffOrder.success, approveOffOrder.error]);

  useEffect(() => {
    if (rejectOffOrder.success) {
      toast.success("Từ chối đơn thành công");
      dispatch({ type: CANCEL_OFFLINE_ORDER_SUCCESS, payload: false });
    }
    if (rejectOffOrder.error) {
      toast.error("Từ chối đơn thất bại, vui lòng thử lại");
      dispatch({ type: CANCEL_OFFLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, rejectOffOrder.success, rejectOffOrder.error]);

  useEffect(() => {
    if (changePaymentMethod.success) {
      toast.success("Cập nhật phương thức thanh toán thành công");
      dispatch({ type: CHANGE_PAYMENT_METHOD_SUCCESS, payload: "" });
    }
    if (changePaymentMethod.error) {
      toast.error("Cập nhật phương thức thanh toán thất bại, vui lòng thử lại");
      dispatch({ type: CHANGE_PAYMENT_METHOD_FAIL, payload: "" });
    }
  }, [triggerReload, changePaymentMethod.success, changePaymentMethod.error]);

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

  const handleChangePaymentMethod = () => {
    if (payMethod) {
      dispatch(changePaymentMethodAction(order_id, payMethod));
    } else {
      toast.error("Vui lòng chọn phương thức thanh toán");
    }
  };

  const columns = [
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
      width: 400,
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
          {params.row.product_name}&emsp;
          {params.row.category}&emsp;
          {params.row.colour}&emsp;
          {params.row.size}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 200,
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
      headerName: "Số lượng",
      width: 100,
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

  const columnStatusPending = [
    {
      field: "product_detail_id",
      headerName: "Mã",
      width: 50,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.total_quantity_price ? "" : params.row.product_detail_id}
        </div>
      ),
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 390,
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
          {params.row.product_name}&emsp;
          {params.row.category}&emsp;
          {params.row.colour}&emsp;
          {params.row.size}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 140,
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
      headerName: "Số lượng",
      width: 80,
    },
    {
      field: "current_quantity_in_store",
      headerName: "S.Lượng trong cửa hàng",
      width: 180,
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
          {params.row.discount_price ? (
            <div className="onlineOrderItem">{`${params.row.discount_price.toLocaleString(
              "vi-VN"
            )}`}</div>
          ) : (
            <div className="onlineOrderItem">{`${params.row.price.toLocaleString("vi-VN")}`}</div>
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
            {status === "Chờ xác nhận" ? (
              <Stack className="bottom-button" direction="row" spacing={2}>
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
                <Button
                  className="deny"
                  variant="outlined"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: "Bạn có muốn hủy đơn hàng này?",
                      subTitle: "Xác nhận",
                      onConfirm: () => {
                        handleReject(order_id);
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
            {status === "Đã nhận hàng" ? (
              <Button
                className="approve"
                variant="outlined"
                onClick={() => handleExportOrder(order_id)}
              >
                Xuất hóa đơn
              </Button>
            ) : (
              <></>
            )}
          </div>

          <Grid container>
            <Grid item xs={5}>
              <div className="container-title">
                <div className="title">Ngày bán:</div>
                <div className="content">&emsp;{create_date}</div>
              </div>
              <div className="container-title">
                <div className="title">Hóa đơn:</div>
                <div className="content">&emsp;{order_id}</div>
              </div>
              <div className="container-title">
                <div className="title">Tên khách hàng:</div>
                <div className="content">&emsp;{customer_name}</div>
              </div>

              <div className="container-title">
                <div className="title">Phương thức thanh toán:</div>
                {zaloPay.data ? (
                  <a href={zaloPay.data.order_url} target="_blank">
                    &emsp;{payment_method}
                  </a>
                ) : (
                  <div className="content">&emsp;{payment_method}</div>
                )}
              </div>
              {status === "Chờ xác nhận" ? (
                <div className="container-title">
                  <div className="title">Đổi thanh toán:</div>
                  <div className="content">
                    <Form.Select
                      options={options}
                      onChange={(e, v) => {
                        setPaymethod(v.value);
                      }}
                      placeholder="Thanh toán"
                    />
                    <CachedIcon
                      fontSize="medium"
                      className="reload-icon"
                      onClick={() => handleChangePaymentMethod()}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={7}>
              <div className="container-title">
                <div className="title">Tên nhân viên:</div>
                <div className="content">&emsp;{staff_name}</div>
              </div>
              <div className="container-title">
                <div className="title">Cửa hàng: </div>
                <div className="content">&emsp;{store.store_name}</div>
              </div>
              <div className="container-title">
                <div className="title">SĐT: </div>
                <div className="content"> &emsp; {store.store_phone}</div>
              </div>
              <div className="container-title">
                <div className="title">Địa chỉ: </div>
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
              hideFooter
              getRowId={(r) => r.product_detail_id}
              loading={loading}
              rows={totalProduct}
              disableSelectionOnClick
              columns={status === "Chờ xác nhận" ? columnStatusPending : columns}
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
