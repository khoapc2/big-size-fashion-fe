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

import "./storeInventoryHistory.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  listInventoryNoteAction,
  // deleteInventoryNoteAction,
} from "../../../redux/actions/inventoryAction";

// import categoryApi from "../../api/categoryApi";
import Notification from "pages/components/dialog/Notification";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import {
  DELETE_INVENTORY_NOTE_FAIL,
  DELETE_INVENTORY_NOTE_SUCCESS,
} from "../../../service/Validations/VarConstant";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function CategoryList() {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  // const { category, error, loading } = useSelector((state) => state.categoryList);
  const listInventoryNote = useSelector((state) => state.listInventoryNote);
  const deleteInventoryNote = useSelector((state) => state.deleteInventoryNoteState);
  // const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keySearch, setSearchText] = useState("");
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  console.log(listInventoryNote);
  useEffect(() => {
    dispatch(listInventoryNoteAction(keySearch, pageState.page, pageState.pageSize));
    if (deleteInventoryNote.success) {
      toast.success("Thao tác thành công");
      dispatch({ type: DELETE_INVENTORY_NOTE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (deleteInventoryNote.error) {
      // console.log(error);
      toast.error("Thao tác thất bại, vui lòng thử lại");
      dispatch({ type: DELETE_INVENTORY_NOTE_FAIL, payload: false });
    }
  }, [
    dispatch,
    pageState.page,
    pageState.pageSize,
    keySearch,
    triggerReload,
    deleteInventoryNote.success,
    deleteInventoryNote.error,
  ]);

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

  const handleClickSearch = (keySearch) => {};

  // function handleRowClick(rowData) {
  //   // console.log(rowData);
  //   // <div>
  //   //   <Route path={`/category/:${rowData}`}>
  //   //     <Product />
  //   //   </Route>
  //   // </div>
  //   // <Link to={`/category/:${rowData.category_id}`}></Link>;
  // }

  // const handleDelete = (id) => {
  //   dispatch(deleteInventoryNoteAction(id));
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  // };

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không có đơn điều chỉnh nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy đơn kiểm kê nào
      </Stack>
    );
  }

  const columns = [
    { field: "inventory_note_id", headerName: "ID", width: 90 },
    {
      field: "inventory_note_name",
      headerName: "Tên đơn kiểm kê",
      width: 400,
      renderCell: (params) => (
        <div className="store-inventory-list-item">{params.row.inventory_note_name}</div>
      ),
    },
    {
      field: "staff_name",
      headerName: "Người tạo",
      width: 200,
    },
    {
      field: "from_date",
      headerName: "Từ ngày",
      width: 120,
    },
    {
      field: "to_date",
      headerName: "Đến ngày",
      width: 120,
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
            onClick={() => navigate(`/inventory-notes/${params.row.inventory_note_id}`)}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">Tìm các đơn kiểm kê</InputLabel>
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
          label="Tìm các đơn kiểm kê"
        />
      </FormControl>
      <Link to="/new-inventory-note">
        <button type="button" className="store-inventory-add-button">
          Tạo đơn kiểm kê mới
        </button>
      </Link>

      <div className="store-inventory-list">
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
              color: "green",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "green",
            },
          }}
          loading={listInventoryNote.loading}
          getRowId={(r) => r.inventory_note_id}
          rows={listInventoryNote.data.content || []}
          disableSelectionOnClick
          rowCount={listInventoryNote.data.total_count}
          rowsPerPageOptions={[10, 20, 50, 100]}
          pagination
          page={pageState.page - 1}
          paginationMode="server"
          onPageChange={(newPage) => setPageState((old) => ({ ...old, page: newPage + 1 }))}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
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
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
