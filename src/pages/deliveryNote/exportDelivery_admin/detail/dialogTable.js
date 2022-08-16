/* eslint-disable */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

import {
  DELIVERY_CART_ACTION_SUCCESS,
  DELIVERY_CART_ACTION_FAIL,
} from "../../../../service/Validations/VarConstant";
import { deliverCartAction } from "../../../../redux/actions/deliverAction";
import "./dialogTable.css";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    minWidth: 1000,
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function TableDialog(props) {
  const { deliveryNote, actionSuccess, actionFail } = useSelector((state) => state.deliveryCart);

  const dispatch = useDispatch();
  const { confirmDialog, setConfirmDialog, isAddProduct } = props;
  const classes = useStyles();
  const data = confirmDialog.data;
  console.log(data);
  console.log(deliveryNote);

  useEffect(() => {
    if (actionSuccess) {
      toast.success("Thêm sản phẩm vào đơn nhập hàng thành công");
      setConfirmDialog({ ...confirmDialog, isOpen: false });
      dispatch({ type: DELIVERY_CART_ACTION_SUCCESS, payload: "" });
    }
    if (actionFail) {
      toast.success("Thêm sản phẩm vào đơn nhập hàng thất bại, Vui lòng thử lại sau");
      dispatch({ type: DELIVERY_CART_ACTION_FAIL, payload: "" });
    }
  }, [actionSuccess, actionFail, dispatch]);

  const handleAddProductToDeliveryNote = () => {
    dispatch(deliverCartAction(data, deliveryNote));
  };

  const columns = [
    {
      field: "product_id",
      headerName: "Mã sản phẩm",
      width: 100,
      renderCell: (params) => <div className="productListItem">{params.row.product_id}</div>,
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 500,
      renderCell: (params) => (
        <div className="productListItem">
          {params.row.product_name}&emsp;&emsp;
          {params.row.colour_name}&emsp;&emsp;
          {params.row.size_name}&emsp;&emsp;
        </div>
      ),
    },
    {
      field: "quantity_in_store",
      headerName: "Hiện có",
      width: 70,
      renderCell: (params) => <div className="productListItem">{params.row.quantity_in_store}</div>,
    },
    {
      field: "required_quantity",
      headerName: "Yêu cầu",
      width: 70,
      renderCell: (params) => <div>{params.row.required_quantity}</div>,
    },
  ];

  return (
    <Dialog fullWidth open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>{confirmDialog.subTitle}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
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
            rows={data}
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
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        {isAddProduct && (
          <Button color="green" onClick={() => handleAddProductToDeliveryNote()}>
            Thêm vào đơn yều cầu nhập hàng
          </Button>
        )}

        <Button color="blue" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
          Trở về
        </Button>
      </DialogActions>
    </Dialog>
  );
}
