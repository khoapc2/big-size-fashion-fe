/* eslint-disable */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import "./exportDeliver.css";
import { listExportDeliver } from "../../../redux/actions/deliverAction";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function StaffList() {
  const { data, error, loading, totalCount } = useSelector((state) => state.viewExportDeliver);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });
  const triggerReload = useSelector((state) => state.triggerReload);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    dispatch(listExportDeliver(pageState.page, pageState.pageSize));
  }, [dispatch, pageState.page, pageState.pageSize, searchText, triggerReload]);

  console.log(data);

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
        Không tìm thấy đơn hàng nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy đơn hàng nào
      </Stack>
    );
  }

  const columns = [
    { field: "delivery_note_id", headerName: "Mã đơn hàng", width: 150 },
    {
      field: "delivery_note_name",
      headerName: "Tên đơn nhập",
      width: 250,
      renderCell: (params) => <div>{params.row.delivery_note_name}</div>,
    },
    {
      field: "total_price",
      headerName: "Tổng giá trị (VNĐ)",
      width: 150,
      renderCell: (params) => (
        <div className="importDeliverItem">{`${params.row.total_price.toLocaleString(
          "vi-VN"
        )}`}</div>
      ),
    },
    {
      field: "create_date",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) => <div>{params.row.create_date}</div>,
    },
    {
      field: "status",
      headerName: "Tình trạng đơn hàng",
      width: 160,
      renderCell: (params) => <div>{params.row.status}</div>,
    },

    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`/delivery-export-detail/${params.row.delivery_note_id}`}>
            <button type="submit" className="exportDeliverEdit">
              Xem chi tiết
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="exportDeliverTab">
      <div className="exportDeliver">
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
          getRowId={(r) => r.delivery_note_id}
          rows={data}
          autoHeight
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
    </div>
  );
}
