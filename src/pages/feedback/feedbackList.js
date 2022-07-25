/* eslint-disable */
// import { useState } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "semantic-ui-react";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import ConfirmDialog from "pages/components/dialog/ConfirmDialog";
import { listFeedback, deleteFeedback } from "../../redux/actions/feedbackAction";
import { triggerReload } from "../../redux/actions/userAction";
import Loading from "../../components/Loading";
import "./viewOfflineOrder.css";
import {
  DELETE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_SUCCESS,
} from "../../service/Validations/VarConstant";

export default function FeedbackForm() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { role } = currentUser;
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, totalCount } = useSelector((state) => state.listFeedbackState);
  const deleteState = useSelector((state) => state.deleteFeedbackState);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(listFeedback(productId, pageState.page, pageState.pageSize));
  }, [dispatch, triggerReload, pageState.page, pageState.pageSize, deleteState.success, deleteState.error]);

  useEffect(() => {
    if (deleteState.success) {
      toast.success("Xóa đánh giá thành công");
      dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (deleteState.error) {
      // console.log(error);
      toast.error("Xóa đánh giá thất bại, vui lòng thử lại");
      dispatch({ type: DELETE_FEEDBACK_FAIL, payload: false });
    }
  }, [dispatch, triggerReload, deleteState.success, deleteState.error]);

  const handleDelete = (id) => {
    dispatch(deleteFeedback(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
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
    {
      field: "feedback_id",
      headerName: "Mã",
      width: 50,
    },
    {
      field: "content",
      headerName: "Nhận xét",
      width: 500,
      renderCell: (params) => <div>{params.row.content}</div>,
    },
    {
      field: "rate",
      headerName: "Đánh giá",
      width: 100,
      renderCell: (params) => <div>{params.row.rate}/5</div>,
    },
    {
      field: "customer_name",
      headerName: "Khách hàng",
      width: 180,
      renderCell: (params) => <div>{params.row.customer_name}</div>,
    },
    {
      field: "create_date",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) => <div>{params.row.create_date}</div>,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => (
        <>
          {role === "Admin" ? (
            <div>
              <Button
                className="productListDelete"
                onClick={() =>
                  setConfirmDialog({
                    isOpen: true,
                    title: "Bạn muốn xóa đánh giá này?",
                    subTitle: "Không khôi phục",
                    onConfirm: () => {
                      handleDelete(params.row.feedback_id);
                    },
                  })
                }
                color="red"
                icon="trash alternate"
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="offlineOrderTopLeft">
          <DataGrid
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:hover": {
                color: "green",
              },
            }}
            autoHeight
            loading={loading}
            getRowId={(r) => r.feedback_id}
            rows={data}
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
      )}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}
