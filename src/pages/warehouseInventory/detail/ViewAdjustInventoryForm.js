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

import { viewDetailInventoryNoteAction } from "../../../redux/actions/inventoryAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
import "./ViewAdjustInventory.css";

export default function OfflineOrderForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });

  const { inventoryId } = useParams();
  const dispatch = useDispatch();
  const viewDetailInventoryNote = useSelector((state) => state.viewDetailInventoryNote);
  console.log(viewDetailInventoryNote);

  useEffect(() => {
    dispatch(viewDetailInventoryNoteAction(inventoryId));
  }, [dispatch, triggerReload]);

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
      {viewDetailInventoryNote.loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="adjust-inventory-top">
          <Formik
            initialValues={{
              staff: "",
            }}
            validateOnBlur
            validateOnChange
          >
            {(formik) => {
              console.log(formik);
              return (
                <div>
                  <Form onSubmit={formik.handleSubmit}>
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
