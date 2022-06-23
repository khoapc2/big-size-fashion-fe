/* eslint-disable */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
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
import { productRows } from "../../dummyData";
import productApi from "../../api/productApi";
import Notification from "pages/components/dialog/Notification";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import ExportToExcel from "pages/helper/exportData";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});

  const [searchText, setSearchText] = useState("");
  let inputSearchHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearchText(lowerCase);
  };

  useEffect(async () => {
    try {
      const res = await productApi.getListProduct();
      // console.log(`Content:" + ${res.content}`);
      setProducts(res.content);
      setLoading(false);
      // setPaging({ current_page, total_pages, page_size, total_count, has_previous, has_next });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(products);
  // console.log(paging);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const handleClickSearch = (searchText) =>{
    
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setData(data.filter((item) => item.id !== id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "success",
    });
  };

  // const log = (params) => {
  //   console.log(params);
  // };

  const columns = [
    { field: "product_id", headerName: "ID", width: 90 },
    {
      field: "product_name",
      headerName: "Product",
      width: 200,
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
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      // renderCell: (params) => (

      // )
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => <div>{params.row.price.toLocaleString("vi-VN")} VNĐ</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/product/:${params.row.product_id}`}>
            <button type="submit" className="productListEdit">
              Edit
            </button>
            <Link to={`/product/:${params.row.product_id}`}>
              <button type="submit" className="productListEdit">
                View
              </button>
            </Link>
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
        <InputLabel htmlFor="outlined-adornment">Search by name</InputLabel>
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
          label="Search by name"
        />
      </FormControl>
      <Link to="/newproduct">
        <button type="button" className="productAddButton">
          Create
        </button>
      </Link>

      <div className="productList">
        <DataGrid
          loading={loading}
          getRowId={(r) => r.product_id}
          rows={products}
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
          }}
          // checkboxSelection
        />
      </div>
      <div className="exportToExcel" style={{ margin: 5 }}>
        <ExportToExcel apiData={products} fileName={"cc"} />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
