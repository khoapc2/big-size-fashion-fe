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

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import "./customerList.css";
import { deleteAccount, listCustomer } from "../../../redux/actions/customerAction";

// import customerApi from "../../api/customerApi";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  DISABLE_ACCOUNT_FAIL,
  DISABLE_ACCOUNT_SUCCESS,
} from "../../../service/Validations/VarConstant";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function CustomerList() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading, totalCount } = useSelector((state) => state.customerList);
  const { success, loadingDelete, errorDelete } = useSelector((state) => state.deleteAccountState);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  console.log(data);
  useEffect(() => {
    dispatch(listCustomer(searchText, pageState.page, pageState.pageSize));
    if (success) {
      toast.success("Thao tác thành công");
      dispatch({ type: DISABLE_ACCOUNT_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (errorDelete) {
      // console.log(error);
      toast.error("Thao tác thất bại, vui lòng thử lại");
      dispatch({ type: DISABLE_ACCOUNT_FAIL, payload: false });
    }
  }, [dispatch, pageState.page, pageState.pageSize, searchText, triggerReload, success, errorDelete]);

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
    //   <Route path={`/customer/:${rowData}`}>
    //     <Product />
    //   </Route>
    // </div>
    // <Link to={`/customer/:${rowData.customer_id}`}></Link>;
  }

  const handleDelete = (id) => {
    dispatch(deleteAccount(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy khách hàng nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy khách hàng nào
      </Stack>
    );
  }

  const columns = [
    { field: "uid", headerName: "Mã", width: 100 },
    {
      field: "fullname",
      headerName: "Họ tên",
      width: 400,
      renderCell: (params) => <div className="customerListItem">{params.row.fullname}</div>,
    },
    {
      field: "username",
      headerName: "Tài khoản",
      width: 160,
      renderCell: (params) => <div>{params.row.username}</div>,
    },
    {
      field: "create_at",
      headerName: "Ngày tạo",
      width: 160,
      renderCell: (params) => <div>{params.row.create_at}</div>,
    },
    {
      field: "status",
      headerName: "Tình trạng",
      width: 120,
      renderCell: (params) => <div>{params.row.status === "Active" ? "Hoạt động" : "Đã khóa"}</div>,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton
            size="large"
            color="secondary"
            type="submit"
            onClick={() => navigate(`/customer/${params.row.uid}`)}
          >
            <VisibilityIcon />
          </IconButton>
          {params.row.status === "Active" ? (
            <Button
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn muốn khóa tài khoản khách hàng này?",
                  subTitle: "Đảm bảo không có sự nhầm lẫn nào",
                  onConfirm: () => {
                    handleDelete(params.row.uid);
                  },
                })
              }
              color="red"
              icon="trash alternate"
            />
          ) : (
            <Button
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn muốn khôi phục tài khoản khách hàng này?",
                  subTitle: "Đảm bảo không có sự nhầm lẫn nào",
                  onConfirm: () => {
                    handleDelete(params.row.uid);
                  },
                })
              }
              color="green"
              icon="undo"
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="customerTab">
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">Tìm kiếm khách hàng</InputLabel>
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
          label="Tìm kiếm khách hàng"
        />
      </FormControl>
      <div className="customerList">
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
          getRowId={(r) => r.uid}
          rows={data}
          autoHeight
          rowCount={totalCount}
          rowsPerPageOptions={[10, 20, 50, 100]}
          pagination
          page={pageState.page - 1}
          paginationMode="server"
          onPageChange={(newPage) => setPageState((old) => ({ ...old, page: newPage + 1}))}
          onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize}))}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageState.pageSize}
          data={(query) =>
            new Promise(() => {
              console.log(query);
            })
          }
          onRowClick={(param) => (
            <>
              <Link to={`/customer/:${param.row.customer_id}`}></Link>
            </>
          )}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay,
            NoResultsOverlay,
          }}
        />
      </div>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
