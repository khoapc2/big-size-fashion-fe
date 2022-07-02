/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StoreDetail from "../storeDetail/ViewStore";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import "./storeList.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { listStore, deleteStore } from "../../../redux/actions/storeAction";

// import storeApi from "../../api/storeApi";
import Notification from "pages/components/dialog/Notification";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function SizeList() {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading } = useSelector((state) => state.storeList);
  const { success: deleteSuccess } = useSelector((state) => state.deleteStoreState);

  console.log(data);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    dispatch(listStore(searchText));
  }, [dispatch, page, searchText, triggerReload, deleteSuccess]);

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

  // function handleRowClick(rowData) {
  //   console.log(rowData);
  //   navigate(`/store/${rowData.id}`);
  // }

  const handleDelete = (id) => {
    dispatch(deleteStore(id)).then((value) => {
      // console.log(value);
      if (deleteSuccess.is_success) {
        toast.success("Xóa cửa hàng thành công");
        dispatch({ type: DELETE_STORE_SUCCESS, payload: false });
        dispatch(triggerReload({}));
      } else {
        toast.error("Xóa cửa hàng thất bại");
      }
    });
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy cửa hàng nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy cửa hàng nào
      </Stack>
    );
  }

  const columns = [
    { field: "store_id", headerName: "Mã cửa hàng", width: 150 },
    {
      field: "store_address",
      headerName: "Địa chỉ",
      width: 400,
      renderCell: (params) => <div className="storeListItem">{params.row.store_address}</div>,
    },
    {
      field: "store_phone",
      headerName: "Điện Thoại",
      width: 160,
      renderCell: (params) => <div>{params.row.store_phone}</div>,
    },
    {
      field: "manager_name",
      headerName: "Quản lý",
      width: 160,
      renderCell: (params) => (
        <div>{params.row.manager_name ? params.row.manager_name : "Không có"}</div>
      ),
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 120,
      renderCell: (params) => <div>{params.row.status ? "Hoạt động" : "Đóng cửa"}</div>,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 250,
      renderCell: (params) => (
        <>
          <button
            type="submit"
            className="storeListEdit"
            onClick={() => navigate(`/store/${params.row.store_id}`)}
          >
            <VisibilityIcon />
          </button>
          <Link to={`/update-store/${params.row.store_id}`}>
            <button type="submit" className="storeListEdit">
              Edit
            </button>
          </Link>

          {/* <Link to={`/store/:${params.row.store_id}`}> */}

          {/* </Link> */}
          <Button
            className="storeListDelete"
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Bạn có muốn xóa cửa hàng này ra khỏi chuỗi Big size không?",
                subTitle: "Xóa cửa hàng",
                onConfirm: () => {
                  handleDelete(params.row.store_id);
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
        <InputLabel htmlFor="outlined-adornment">Tìm kiếm địa chỉ</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          value={searchText}
          onChange={inputSearchHandler}
          endadornment={
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
          label="Tìm kiếm địa chỉ"
        />
      </FormControl>
      <Link to="/newstore">
        <button type="button" className="storeAddButton">
          Tạo cửa hàng mới
        </button>
      </Link>

      <div className="storeList">
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
          getRowId={(r) => r.store_id}
          rows={data}
          // disableSelectionOnClick
          columns={columns}
          pageSize={8}
          data={(query) =>
            new Promise(() => {
              console.log(query);
            })
          }
          // onRowClick={(param) => {
          //   // console.log(param);
          // ;
          //   // <StoreDetail type="view" id={param.id} />;
          // }}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay,
            NoResultsOverlay,
          }}
        />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
