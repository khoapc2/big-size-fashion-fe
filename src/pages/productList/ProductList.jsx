/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import "./productList.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { listProduct } from "../../redux/actions/productAction";

// import productApi from "../../api/productApi";
import Notification from "pages/components/dialog/Notification";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import ExportToExcel from "pages/helper/exportData";
import Product from "pages/product/Product";
import VisibilityIcon from "@mui/icons-material/Visibility";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function ProductList() {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading } = useSelector((state) => state.productList);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(listProduct(searchText, page));
  }, [dispatch, page, searchText, triggerReload]);

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

  const handleClickSearch = (searchText) => {};

  function handleRowClick(rowData) {
    // console.log(rowData);
    // <div>
    //   <Route path={`/product/:${rowData}`}>
    //     <Product />
    //   </Route>
    // </div>
    // <Link to={`/product/:${rowData.product_id}`}></Link>;
  }

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "success",
    });
  };

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
    { field: "product_id", headerName: "ID", width: 30 },
    {
      field: "product_name",
      headerName: "Sản phẩm",
      width: 350,
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
      field: "promotion_price",
      headerName: "Giá áp dụng khuyến mãi (VNĐ)",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.promotion_price
            ? `${params.row.price.toLocaleString("vi-VN")}`
            : "Hiện chưa áp dụng"}
        </div>
      ),
    },
    {
      field: "promotion_value",
      headerName: "Giá trị khuyến mãi (%)",
      width: 200,
      renderCell: (params) => (
        <div>{params.row.promotion_value ? `${params.row.promotion_value}` : "Chưa áp dụng"}</div>
      ),
    },

    {
      field: "status",
      headerName: "Tình trạng",
      width: 120,
      renderCell: (params) => <div>{params.row.status ? "Đang bán" : "Nghĩ bán"}</div>,
    },

    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            size="large"
            color="secondary"
            type="submit"
            onClick={() => navigate(`/product/${params.row.product_id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          <Link to={`/update-product/${params.row.product_id}`}>
            <button type="submit" className="productListEdit">
              Edit
            </button>
          </Link>

          <Button
            className="productListDelete"
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure to delete this record?",
                subTitle: "Delete",
                onConfirm: () => {
                  handleDelete(params.row.id);
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
    <DashboardLayout>
      <DashboardNavbar />
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">Tìm kiếm tên sản phẩm</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          value={searchText}
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
          label="Tìm kiếm tên sản phẩm"
        />
      </FormControl>
      <Link to="/newproduct">
        <button type="button" className="productAddButton">
          Tạo sản phẩm
        </button>
      </Link>

      <div className="productList">
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "green",
            },
          }}
          loading={loading}
          getRowId={(r) => r.product_id}
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
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
      <div className="exportToExcel" style={{ margin: 5 }}>
        <ExportToExcel apiData={data} fileName={"product"} />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
