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

import "./onlineOrder.css";

import { listOrder } from "../../../../../redux/actions/orderAction";

// import staffApi from "../../api/staffApi";
// import Notification from "pages/components/dialog/Notification";
// import ConfirmDialog from "pages/components/dialog/ConfirmDialog";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default function StaffList() {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  // const [paging, setPaging] = useState({});
  //Test
  const { data, error, loading, totalCount } = useSelector((state) => state.viewOnlineOrder);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });
  const triggerReload = useSelector((state) => state.triggerReload);
  // const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  // console.log(data);
  useEffect(() => {
    dispatch(listOrder("Approved" ,true, pageState.page, pageState.pageSize));
  }, [dispatch, pageState.page, pageState.pageSize, searchText, triggerReload]);

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
        Kh??ng t??m th???y ????n h??ng n??o
      </Stack>
    );
  }

  function NoResultsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Kh??ng t??m th???y ????n h??ng n??o
      </Stack>
    );
  }

  const columns = [
    { field: "order_id", headerName: "M?? ????n h??ng", width: 150 },
    {
      field: "total_price",
      headerName: "T???ng gi?? tr??? (VN??)",
      width: 150,
      renderCell: (params) => (
        <div className="onlineOrderItem">{`${params.row.total_price.toLocaleString("vi-VN")}`}</div>
      ),
    },
    {
      field: "total_price_after_discount (VN??)",
      headerName: "T???ng gi?? tr??? sau khi gi???m gi??",
      width: 250,
      renderCell: (params) => (
        <div>
          {params.row.total_price_after_discount
            ? `${params.row.total_price_after_discount.toLocaleString("vi-VN")}`
            : "Kh??ng c??"}
        </div>
      ),
    },
    {
      field: "create_date",
      headerName: "Ng??y c???p nh???t",
      width: 160,
      renderCell: (params) => <div>{params.row.create_date}</div>,
    },
    {
      field: "status",
      headerName: "T??nh tr???ng ????n h??ng",
      width: 160,
      renderCell: (params) => <div>{params.row.status}</div>,
    },

    {
      field: "action",
      headerName: "Thao t??c",
      width: 250,
      renderCell: (params) => (
        <>
          <Link to={`/online-order-detail/${params.row.order_id}`}>
            <button type="submit" className="onlineOrderEdit">
              Xem chi ti???t
            </button>
          </Link>
          {/* <Button
            className="onlineOrderDelete"
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
          /> */}
        </>
      ),
    },
  ];

  return (
    <div className="onlineOrderTab">
      {/* <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment">T??m ki???m nh??n vi??n</InputLabel>
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
          label="T??m ki???m nh??n vi??n"
        />
      </FormControl> */}

      <div className="onlineOrder">
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
          getRowId={(r) => r.order_id}
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
