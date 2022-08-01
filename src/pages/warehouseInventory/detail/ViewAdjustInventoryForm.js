/* eslint-disable */
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
} from "../../../redux/actions/orderAction";
import { SchemaErrorMessageOnlineOrderAssign } from "../../../service/Validations/OrderAssignValidation";

import { listStaffInStoreAction } from "../../../redux/actions/staffAction";
import { viewDetailInventoryNoteAction } from "../../../redux/actions/inventoryAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
import "./ViewAdjustInventory.css";
import {
  APPROVE_ONLINE_ORDER_SUCCESS,
  APPROVE_ONLINE_ORDER_FAIL,
  CANCEL_ONLINE_ORDER_SUCCESS,
  CANCEL_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_SUCCESS,
} from "../../../service/Validations/VarConstant";

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { inventoryId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalProduct } = useSelector((state) => state.viewDetailOfflineOrder);
  const viewDetailInventoryNote = useSelector((state) => state.viewDetailInventoryNote);
  const approveOnOrder = useSelector((state) => state.approveOnlineOrder);
  const rejectOnOrder = useSelector((state) => state.rejectOnlineOrder);
  const cancelOnOrder = useSelector((state) => state.cancelOnlineOrder);
  const staffDropdown = useSelector((state) => state.getListStaffDropDown);
  const { product_list, store, order_id, create_date, status, payment_method } = data;
  // console.log(data);
  console.log(viewDetailInventoryNote);

  useEffect(() => {
    dispatch(viewDetailOfflineOrderAction(inventoryId));
    dispatch(viewDetailInventoryNoteAction(inventoryId));

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
      renderCell: (params) => <div className="productListItem">{params.row.product_detail_id}</div>,
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 300,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.product_name}&thinsp; - &thinsp;{params.row.colour}&thinsp; - &thinsp;
          {params.row.size}
        </div>
      ),
    },
    {
      field: "beginning_quantity",
      headerName: "S.Lượng Đầu kì",
      width: 120,
    },
    {
      field: "ending_quantity",
      headerName: "S.lượng Cuối kì",
      width: 120,
    },
    {
      field: "total_quantity_price",
      headerName: "S.lượng sau khi điều chỉnh",
      width: 170,
    },
  ];

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="adjust-inventory-top">
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
                    <div className="button-approve">
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
                          <div className="title">Ngày điều chỉnh:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.adjusted_date}
                          </div>
                        </div>
                        <div className="container-title">
                          <div className="title">Đơn kiểm kê:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.inventory_note_id}
                          </div>
                        </div>
                        <div className="container-title">
                          <div className="title">Tên đơn:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.inventory_note_name}
                          </div>
                        </div>
                        <div className="container-title">
                          <div className="title">Người tạo đơn:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.staff_name}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <div className="container-title">
                          <div className="title">Kiểm kê từ ngày:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.from_date} - &thinsp;
                            {viewDetailInventoryNote.data.to_date}
                          </div>
                        </div>
                        <div className="container-title">
                          <div className="title">Cửa hàng:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.store.store_name}
                          </div>
                        </div>
                        <div className="container-title">
                          <div className="title">Địa chỉ:</div>
                          <div className="content">
                            &emsp;{viewDetailInventoryNote.data.store.store_address}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
              );
            }}
          </Formik>
          <div className="adjust-inventory-top-left">
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
              loading={viewDetailInventoryNote.loading}
              rows={viewDetailInventoryNote.data.inventory_note_detail || []}
              disableSelectionOnClick
              columns={columns}
              pageSize={10}
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
    </div>
  );
}
