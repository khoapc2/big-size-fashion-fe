/* eslint-disable */
import { Link } from "react-router-dom";
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

import "./colorList.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { listColor } from "../../../redux/actions/colorAction";

// import colorApi from "../../api/colorApi";
import Notification from "pages/components/dialog/Notification";
import ConfirmDialog from "pages/components/dialog/ConfirmDialog";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function ColorList() {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { colour, error, loading } = useSelector((state) => state.colorList);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const [keySearch, setSearchText] = useState("");

  useEffect(() => {
    dispatch(listColor({ keySearch }));
  }, [dispatch, page, keySearch, triggerReload]);

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

  function handleRowClick(rowData) {
    // console.log(rowData);
    // <div>
    //   <Route path={`/color/:${rowData}`}>
    //     <Product />
    //   </Route>
    // </div>
    // <Link to={`/color/:${rowData.color_id}`}></Link>;
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
        Không tìm thấy màu sắc nào
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Không tìm thấy màu sắc nào
      </Stack>
    );
  }

  const columns = [
    { field: "colour_id", headerName: "ID Màu", width: 90 },
    {
      field: "colour_name",
      headerName: "Màu",
      width: 200,
      renderCell: (params) => <div className="colorListItem">{params.row.colour_name}</div>,
    },
    {
      field: "colour_code",
      headerName: "Mã Màu",
      width: 200,
      renderCell: (params) => <div className="colorListItem">{params.row.colour_code}</div>,
    },
    // {
    //   field: "status",
    //   headerName: "Tình trạng",
    //   width: 120,
    // },
    {
      field: "action",
      headerName: "Thao tác",
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/update-color/${params.row.colour_id}`}>
            <button type="submit" className="colorListEdit">
              Chỉnh sửa
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">Tìm kiếm màu sắc</InputLabel>
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
          label="Tìm kiếm màu sắc"
        />
      </FormControl>
      <Link to="/newColor">
        <button type="button" className="colorAddButton">
          Tạo màu mới
        </button>
      </Link>

      <div className="colorList">
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
          getRowId={(r) => r.colour_id}
          rows={colour}
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
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </DashboardLayout>
  );
}
