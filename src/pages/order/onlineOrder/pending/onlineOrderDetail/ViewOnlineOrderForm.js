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
import TableDialog from "pages/deliveryNote/exportDelivery_admin/detail/dialogTable";
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
  const [tableDialog, setTableDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    data: [],
  });
  const { onlineOrderId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailOfflineOrder);
  const approveOnOrder = useSelector((state) => state.approveOnlineOrder);
  const rejectOnOrder = useSelector((state) => state.rejectOnlineOrder);
  const cancelOnOrder = useSelector((state) => state.cancelOnlineOrder);
  const staffDropdown = useSelector((state) => state.getListStaffDropDown);
  const {
    product_list,
    store,
    order_id,
    create_date,
    status,
    payment_method,
    customer_name,
    delivery_address,
  } = data;
  console.log(data);
  console.log(product_list);

  useEffect(() => {
    dispatch(viewDetailOfflineOrderAction(onlineOrderId));
    dispatch(listStaffInStoreAction());
  }, [
    dispatch,
    triggerReload,
    approveOnOrder.success,
    approveOnOrder.error,
    rejectOnOrder.success,
    rejectOnOrder.error,
    cancelOnOrder.success,
    cancelOnOrder.error,
  ]);

  useEffect(() => {
    if (approveOnOrder.success) {
      if (approveOnOrder.success.is_success && !approveOnOrder.success.content) {
        console.log(approveOnOrder);
        toast.success("Duyệt đơn hàng thành công");
        dispatch({ type: APPROVE_ONLINE_ORDER_SUCCESS, payload: false });
      } else if (approveOnOrder.success.is_success && approveOnOrder.success.content) {
        console.log(approveOnOrder.success.content);
        setTableDialog({
          isOpen: true,
          title: "Yêu cầu nhập hàng không thành công?",
          subTitle: "Có sản phẩm vượt số lượng trong kho",
          data: approveOnOrder.success.content,
        });
        toast.error("Duyệt thất bại, có sản phẩm vượt số lượng trong kho");
        dispatch({ type: APPROVE_ONLINE_ORDER_SUCCESS, payload: false });
      }
    }
    if (approveOnOrder.error) {
      toast.error("Duyệt đơn hàng thất bại, vui lòng thử lại");
      dispatch({ type: APPROVE_ONLINE_ORDER_FAIL, payload: false });
    }
  }, [triggerReload, approveOnOrder.success, approveOnOrder.error]);

  useEffect(() => {
    if (rejectOnOrder.success) {
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
      toast.success("Hủy thành công, đơn hàng quay lại chờ xác nhận");
      dispatch({ type: CANCEL_ONLINE_ORDER_SUCCESS, payload: false });
    }
    if (cancelOnOrder.error) {
      toast.error("Hủy đơn hàng thất bại, vui lòng thử lại");
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
      width: 350,
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
                          <div className="title">Tên KH:</div>
                          <div className="content">&emsp;{customer_name}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Phương thức thanh toán:</div>
                          <div className="content">&emsp;{payment_method}</div>
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div className="container-title">
                          <div className="title">Cửa hàng:</div>
                          <div className="content">
                            &emsp;{store.store_name} &emsp; - &emsp; {store.store_phone}
                          </div>
                        </div>
                        {/* <div className="container-title">
                          <div className="title">SĐT cửa hàng:</div>
                          <div className="content"></div>
                        </div> */}

                        <div className="container-title">
                          <div className="title">Nhân viên chuẩn bị đơn hàng:&emsp;</div>
                          <div className="content">
                            {staffDropdown.loading ? (
                              <Loading />
                            ) : (
                              <div>
                                {data.status !== "Chờ xác nhận" ? (
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
                                    // disabled
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
                        <div className="container-address">
                          <div className="title-address">Địa chỉ cửa hàng:</div>
                          <div className="content-address">&emsp;{store.store_address}</div>
                        </div>
                        <div className="container-title">
                          <div className="title">Địa chỉ giao hàng:</div>
                          <div className="content">&emsp;{delivery_address.receive_address}</div>
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
              hideFooter
              loading={loading}
              rows={totalProduct}
              disableSelectionOnClick
              columns={status === "Chờ xác nhận" ? columnStatusPending : columns}
              pageSize={8}
              rowsPerPageOptions={[]}
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
