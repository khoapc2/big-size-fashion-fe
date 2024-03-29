/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import { DELETE_STORE_FAIL, DELETE_STORE_SUCCESS } from "../../../service/Validations/VarConstant";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function SizeList() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading} = useSelector((state) => state.storeList);
  const deleteState = useSelector((state) => state.deleteStoreState);
  const [role, setRole] = useState("");
  const triggerReload = useSelector((state) => state.triggerReload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keySearch, setKeySearch] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setRole(currentUser.role);
  }, []);

  useEffect(() => {
    dispatch(listStore({ keySearch }));
    if (deleteState.success) {
      toast.success("Xóa cửa hàng thành công");
      dispatch({ type: DELETE_STORE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (deleteState.error) {
      // console.log(error);
      toast.error("Xóa cửa hàng thất bại, vui lòng thử lại");
      dispatch({ type: DELETE_STORE_FAIL, payload: false });
    }
  }, [
    dispatch,
    keySearch,
    triggerReload,
    deleteState.success,
    deleteState.error,
  ]);

  let inputSearchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setKeySearch(lowerCase);
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

  const handleDelete = (id) => {
    dispatch(deleteStore(id));
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
    { field: "store_id", headerName: "Mã", width: 100 },
    {
      field: "store_name",
      headerName: "Tên cửa hàng",
      width: 150,
      renderCell: (params) => <div className="storeListItem">{params.row.store_name}</div>,
    },
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
      width: 180,
      renderCell: (params) => (
        <>
          <IconButton
            type="submit"
            size="large"
            color="secondary"
            onClick={() => navigate(`/store/${params.row.store_id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          {role === "Admin" ? (
            <Link to={`/update-store/${params.row.store_id}`}>
              <button type="submit" className="storeListEdit">
                Sửa
              </button>
            </Link>
          ) : (
            ""
          )}
          {role === "Admin" ? (
            params.row.status ? (
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
            ) : (
              <Button
                className="storeListDelete"
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    title: "Bạn có khôi phục cửa hàng này?",
                    subTitle: "Khôi phục cửa hàng",
                    onConfirm: () => {
                      handleDelete(params.row.store_id);
                    },
                  })
                }
                color="green"
                icon="undo"
              />
            )
          ) : (
            ""
          )}
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
          value={keySearch}
          onChange={inputSearchHandler}
          label="Tìm kiếm địa chỉ"
        />
      </FormControl>
      {role === "Admin" ? (
        <Link to="/newstore">
          <button type="button" className="storeAddButton">
            Tạo cửa hàng mới
          </button>
        </Link>
      ) : (
        ""
      )}

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
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
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
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
