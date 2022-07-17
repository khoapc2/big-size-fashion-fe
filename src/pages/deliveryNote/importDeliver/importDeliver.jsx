/* eslint-disable */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import IconButton from "@mui/material/IconButton";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  // GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import "./importDeliver.css";

import { listImportDeliver } from "../../../redux/actions/deliverAction";

// import staffApi from "../../api/staffApi";
// import ConfirmDialog from "pages/components/dialog/ConfirmDialog";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function StaffList() {
  // const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading } = useSelector((state) => state.viewImportDeliver);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  console.log(data);
  useEffect(() => {
    dispatch(listImportDeliver());
  }, [dispatch, page, searchText, triggerReload]);

  // let inputSearchHandler = (e) => {
  //   let lowerCase = e.target.value.toLowerCase();
  //   setSearchText(lowerCase);
  // };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  // const handleClickSearch = (searchText) => {};

  // const handleDelete = (id) => {
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  //   setNotify({
  //     isOpen: true,
  //     message: "Deleted Successfully",
  //     type: "success",
  //   });
  // };

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
      width: 250,
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
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/offline-order-detail/${params.row.order_id}`}>
            <button type="submit" className="importDeliverEdit">
              Xem chi tiết
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="importDeliverTab">
      <Link to="/create-import-invoice">
        <button type="button" className="staffAddButton">
          Tạo đơn nhập hàng mới
        </button>
      </Link>

      <div className="importDeliver">
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
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          data={(query) =>
            new Promise(() => {
              console.log(query);
            })
          }
          autoHeight
          // onRowClick={(param) => (
          //   <>
          //     <Link to={`/staff/:${param.row.uid}`}></Link>
          //   </>
          // )}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay,
            NoResultsOverlay,
          }}
        />
      </div>
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
      {/* <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} /> */}
    </div>
  );
}
