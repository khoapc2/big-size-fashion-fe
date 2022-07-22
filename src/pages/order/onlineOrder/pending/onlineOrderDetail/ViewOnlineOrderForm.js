// import { useState } from "react";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { Formik } from "formik";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  viewDetailOfflineOrderAction,
  approveOnlineOrderAction,
  cancelOnlineOrderAction,
  rejectOnlineOrderAction,
} from "../../../../../redux/actions/orderAction";
import { SchemaErrorMessageOnlineOrderAssign } from "../../../../../service/Validations/OrderAssignValidation";

import { listStaffInStoreAction } from "../../../../../redux/actions/staffAction";
import { triggerReload } from "../../../../../redux/actions/userAction";
import Loading from "../../../../../components/Loading";
import "./viewOnlineOrder.css";
import {
  APPROVE_ONLINE_ORDER_SUCCESS,
  APPROVE_ONLINE_ORDER_FAIL,
  CANCEL_ONLINE_ORDER_SUCCESS,
  CANCEL_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_SUCCESS,
} from "../../../../../service/Validations/VarConstant";

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { onlineOrderId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailOfflineOrder);
  const approveOnOrder = useSelector((state) => state.approveOnlineOrder);
  const rejectOnOrder = useSelector((state) => state.rejectOnlineOrder);
  const cancelOnOrder = useSelector((state) => state.cancelOnlineOrder);
  const staffDropdown = useSelector((state) => state.getListStaffDropDown);
  const { product_list, store, order_id, create_date, status, payment_method } = data;
  const [reload, setReload] = useState(false);
  console.log(data);
  console.log(product_list);

  useEffect(() => {
    dispatch(viewDetailOfflineOrderAction(onlineOrderId));
    dispatch(listStaffInStoreAction());
    setReload(false);
  }, [dispatch, triggerReload, reload]);

  useEffect(() => {
    if (approveOnOrder.success) {
      setReload(true);
      toast.success("Duyệt đơn hàng thành công");
      dispatch({ type: APPROVE_ONLINE_ORDER_SUCCESS, payload: false });
    }
    if (approveOnOrder.error) {
      toast.error("Duyệt đơn hàng thất bại, vui lòng thử lại");
      dispatch({ type: APPROVE_ONLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, approveOnOrder.success, approveOnOrder.error]);

  useEffect(() => {
    if (rejectOnOrder.success) {
      setReload(true);
      toast.success("Từ chối đơn hàng thành công");
      dispatch({ type: REJECT_ONLINE_ORDER_SUCCESS, payload: false });
    }
    if (rejectOnOrder.error) {
      toast.error("Từ chối đơn hàng thất bại, vui lòng thử lại");
      dispatch({ type: REJECT_ONLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, rejectOnOrder.success, rejectOnOrder.error]);

  useEffect(() => {
    if (cancelOnOrder.success) {
      setReload(true);
      toast.success("Hủy thành công, đơn hàng quay lại chờ xác nhận");
      dispatch({ type: CANCEL_ONLINE_ORDER_SUCCESS, payload: false });
    }
    if (cancelOnOrder.error) {
      toast.error("Từ chối đơn hàng thất bại, vui lòng thử lại");
      dispatch({ type: CANCEL_ONLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, cancelOnOrder.success, cancelOnOrder.error]);

  const onSubmit = (result) => {
    console.log("submit");
    dispatch(approveOnlineOrderAction(order_id, result));
  };

  const handleReject = (id) => {
    dispatch(rejectOnlineOrderAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleCancel = (id) => {
    dispatch(cancelOnlineOrderAction(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const columns = [
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
      headerName: "Đơn giá",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.discount_price_per_one ? (
            <div>
              <del>{params.row.price_per_one.toLocaleString("vi-VN")}</del>&emsp;
              {params.row.discount_price_per_one.toLocaleString("vi-VN")}
            </div>
          ) : (
            <div>{params.row.price.toLocaleString("vi-VN")}</div>
          )}
        </div>
      ),
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
        <div className="onlineOrderTop">
          <Formik
            initialValues={{
              staff: "",
            }}
            onSubmit={onSubmit}
            validationSchema={SchemaErrorMessageOnlineOrderAssign}
            validateOnBlur
            validateOnChange
          >
            {(formik) => {
              console.log(formik);
              return (
                <div>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="buttonApprove">
                      {status === "Chờ xác nhận" ? (
                        <Stack className="bottom-button" direction="row" spacing={2}>
                          <Button
                            className="approve"
                            variant="outlined"
                            type="submit"
                            disabled={formik.isSubmitting}
                          >
                            Xác nhận
                          </Button>
                          <Button
                            className="deny"
                            variant="outlined"
                            disabled={formik.isSubmitting}
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: "Bạn có muốn từ chối đơn hàng này?",
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
                        <div />
                      )}
                      {status === "Đã xác nhận" || status === "Đã đóng gói" ? (
                        <Stack className="bottom-button" direction="row" spacing={2}>
                          <Button
                            className="deny"
                            variant="outlined"
                            disabled={formik.isSubmitting}
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                title: "Bạn có muốn hủy đơn hàng này?",
                                subTitle: "Đơn hàng quay lại chờ xác nhận",
                                onConfirm: () => {
                                  handleCancel(order_id);
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
                    <Grid container>
                      <Grid item xs={4}>
                        <div className="container-title">
                          <div className="title">Ngày bán:</div>
                          <div className="content">&emsp;{create_date}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Hóa đơn:</div>
                          <div className="content">&emsp;{order_id}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Phương thức thanh toán:</div>
                          <div className="content">&emsp;{payment_method}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Nhân viên phụ trách:&emsp;</div>
                          <div className="content">
                            {staffDropdown.loading ? (
                              <Loading />
                            ) : (
                              <div>
                                {data.staff_name ? (
                                  <Form.Select
                                    fluid
                                    // options={staffDropdown.data || []}
                                    placeholder="Nhân viên"
                                    onChange={(e, v) => {
                                      formik.setFieldValue("staff", v.value);
                                    }}
                                    name="staff"
                                    value={formik.values.staff}
                                    error={formik.errors.staff}
                                    text={data.staff_name}
                                  />
                                ) : (
                                  <Form.Select
                                    fluid
                                    options={staffDropdown.data || []}
                                    placeholder="Nhân viên"
                                    onChange={(e, v) => {
                                      formik.setFieldValue("staff", v.value);
                                    }}
                                    name="staff"
                                    value={formik.values.staff}
                                    error={formik.errors.staff}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div className="container-title">
                          <div className="title">Cửa hàng:</div>
                          <div className="content">&emsp;{store.store_name}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">SĐT cửa hàng:</div>
                          <div className="content">&emsp; {store.store_phone}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Địa chỉ:</div>
                          <div className="content">&emsp;{store.store_address}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
              );
            }}
          </Formik>
          <div className="onlineOrderTopLeft">
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
              pageSize={8}
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
