/* eslint-disable */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "semantic-ui-react";
import "./productList.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { productRows } from "../../dummyData";
import productApi from "../../api/productApi";
import Notification from "pages/dialog/Notification";
import ConfirmDialog from "pages/dialog/ConfirmDialog";

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

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setData(data.filter((item) => item.id !== id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
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
                subTitle: "ccdmm",
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
          // checkboxSelection
        />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
