/* eslint-disable */
// import { useState } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "semantic-ui-react";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  listProductOfPromotion,
  deleteProductFromPromotion,
} from "../../../redux/actions/promotionAction";
import { triggerReload } from "../../../redux/actions/userAction";
import Loading from "../../../components/Loading";
import "./viewOfflineOrder.css";
import {
  DELETE_PRODUCT_FROM_PROMOTION_FAIL,
  DELETE_PRODUCT_FROM_PROMOTION_SUCCESS,
} from "../../../service/Validations/VarConstant";

export default function ProductsInPromotionForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  const { promotionId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalCount } = useSelector((state) => state.listProductOfPromotionState);
  const deleteState = useSelector((state) => state.deleteProductFromPromotionState);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });
  const [keySearch, setSearchText] = useState("");
  useEffect(() => {
    dispatch(listProductOfPromotion(keySearch, promotionId, pageState.page, pageState.pageSize));
  }, [
    dispatch,
    keySearch,
    triggerReload,
    pageState.page,
    pageState.pageSize,
    deleteState.success,
    deleteState.error,
  ]);

  useEffect(() => {
    if (deleteState.success) {
      toast.success("Xóa sản phẩm khỏi khuyến mại thành công");
      dispatch({ type: DELETE_PRODUCT_FROM_PROMOTION_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (deleteState.error) {
      // console.log(error);
      toast.error("Xóa sản phẩm khỏi khuyến mại thất bại, vui lòng thử lại");
      dispatch({ type: DELETE_PRODUCT_FROM_PROMOTION_FAIL, payload: false });
    }
  }, [dispatch, triggerReload, deleteState.success, deleteState.error]);

  const handleDelete = (id) => {
    dispatch(deleteProductFromPromotion(promotionId, id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  const handleClickSearch = (e) => {};

  let inputSearchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy sản phẩm nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy sản phẩm nào
      </Stack>
    );
  }

  const columns = [
    {
      field: "product_id",
      headerName: "Mã sản phẩm",
      width: 100,
    },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 400,
      renderCell: (params) => (
        <div className="productListItem">
          <img
            className="productListImg"
            src={params.row.image_url}
            alt={params.row.product_name}
          />
          {params.row.product_name}
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Giá bán (VNĐ)",
      width: 150,
      renderCell: (params) => <div>{params.row.price.toLocaleString("vi-VN")} </div>,
    },
    {
      field: "promotion_value",
      headerName: "Giá trị khuyến mãi (%)",
      width: 250,
      renderCell: (params) => (
        <div>{params.row.promotion_value ? `${params.row.promotion_value}` : "Chưa áp dụng"}</div>
      ),
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => (
        <>
          <Button
            className="productListDelete"
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Bạn muốn xóa sản phẩm này khỏi khuyến mại này?",
                subTitle: "Không khôi phục",
                onConfirm: () => {
                  handleDelete(params.row.product_id);
                },
              })
            }
            color="red"
            icon="trash alternate"
          />
        </>
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
        <div className="offlineOrderTopLeft">
          <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment">Tìm kiếm sản phẩm</InputLabel>
            <OutlinedInput
              id="outlined-adornment"
              value={keySearch}
              onChange={inputSearchHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Tìm kiếm quản lý"
            />
          </FormControl>

          <Link to={`/add-products-to-promotion/${promotionId}`}>
            <button type="button" className="managerAddButton">
              Thêm sản phẩm khuyến mại
            </button>
          </Link>

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
            loading={loading}
            getRowId={(r) => r.product_id}
            rows={data}
            rowCount={totalCount}
            rowsPerPageOptions={[10, 20, 50, 100]}
            pagination
            page={pageState.page - 1}
            paginationMode="server"
            onPageChange={(newPage) => setPageState((old) => ({ ...old, page: newPage + 1 }))}
            onPageSizeChange={(newPageSize) =>
              setPageState((old) => ({ ...old, pageSize: newPageSize }))
            }
            disableSelectionOnClick
            columns={columns}
            pageSize={pageState.pageSize}
            data={(query) =>
              new Promise(() => {
                console.log(query);
              })
            }
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay,
              NoResultsOverlay,
            }}
          />
        </div>
      )}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
