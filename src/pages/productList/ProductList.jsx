import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./productList.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { productRows } from "../../dummyData";
import productApi from "../../api/productApi";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [products, setProducts] = useState([]);
  // const [paging, setPaging] = useState({});

  useEffect(async () => {
    try {
      const res = await productApi.getListProduct();
      // console.log(`Content:" + ${res.content}`);
      setProducts(res.content);
      // setPaging({ current_page, total_pages, page_size, total_count, has_previous, has_next });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(products);
  // console.log(paging);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <button type="button" className="productAddButton">
        Create
      </button>
      <div className="productList">
        <DataGrid
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
    </DashboardLayout>
  );
}
