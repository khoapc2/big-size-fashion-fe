import orderApi from "../../api/orderApi";
import zaloApi from "../../api/zaloApi";
import {
  ONLINE_ORDER_LIST_REQUEST,
  ONLINE_ORDER_LIST_SUCCESS,
  ONLINE_ORDER_LIST_FAIL,
  OFFLINE_ORDER_LIST_REQUEST,
  OFFLINE_ORDER_LIST_SUCCESS,
  OFFLINE_ORDER_LIST_FAIL,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_FAIL,
  APPROVE_OFFLINE_ORDER_REQUEST,
  APPROVE_OFFLINE_ORDER_SUCCESS,
  APPROVE_OFFLINE_ORDER_FAIL,
  CANCEL_OFFLINE_ORDER_REQUEST,
  CANCEL_OFFLINE_ORDER_SUCCESS,
  CANCEL_OFFLINE_ORDER_FAIL,
  APPROVE_ONLINE_ORDER_REQUEST,
  APPROVE_ONLINE_ORDER_SUCCESS,
  APPROVE_ONLINE_ORDER_FAIL,
  CANCEL_ONLINE_ORDER_REQUEST,
  CANCEL_ONLINE_ORDER_SUCCESS,
  CANCEL_ONLINE_ORDER_FAIL,
  GET_ZALO_LINK_SUCCESS,
  GET_ZALO_LINK_FAIL,
  REJECT_ONLINE_ORDER_REQUEST,
  REJECT_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listOrder = (status, type) => async (dispatch) => {
  const params = {
    OrderStatus: status,
    OrderType: type,
  };
  if (type) {
    dispatch({ type: ONLINE_ORDER_LIST_REQUEST });
  } else {
    dispatch({ type: OFFLINE_ORDER_LIST_REQUEST });
  }
  try {
    if (type) {
      const data = await orderApi.getListOrder(params);
      dispatch({ type: ONLINE_ORDER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: ONLINE_ORDER_LIST_FAIL, payload: "" });
    } else {
      const data = await orderApi.getListOrder(params);
      dispatch({ type: OFFLINE_ORDER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: OFFLINE_ORDER_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    if (status) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: ONLINE_ORDER_LIST_FAIL, payload: message });
    } else {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: OFFLINE_ORDER_LIST_FAIL, payload: message });
    }
  }
};

export const viewDetailOfflineOrderAction = (orderId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST,
    payload: { orderId },
  });
  try {
    dispatch({ type: GET_ZALO_LINK_FAIL });
    const data = await orderApi.getOrderDetailById(orderId);
    console.log(data);
    if (
      data.content.payment_method === "ZaloPay" &&
      data.content.order_type === "Offline" &&
      data.content.status === "Chờ xác nhận"
    ) {
      try {
        const respone = await zaloApi.payWithZaloLink(orderId);
        dispatch({ type: GET_ZALO_LINK_SUCCESS, payload: respone.content });
      } catch (error) {
        dispatch({
          type: GET_ZALO_LINK_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
    console.log(data);
    dispatch({ type: VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_OFFLINE_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const approveOfflineOrderAction = (id) => async (dispatch) => {
  dispatch({
    type: APPROVE_OFFLINE_ORDER_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await orderApi.approveOfflineOrder(id);
      dispatch({ type: APPROVE_OFFLINE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: APPROVE_OFFLINE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const cancelOfflineOrderAction = (id) => async (dispatch) => {
  dispatch({
    type: CANCEL_OFFLINE_ORDER_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await orderApi.rejectOrder(id);
      dispatch({ type: CANCEL_OFFLINE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CANCEL_OFFLINE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const approveOnlineOrderAction = (id, staffId) => async (dispatch) => {
  dispatch({
    type: APPROVE_ONLINE_ORDER_REQUEST,
    payload: { id },
  });
  try {
    const order_id = id;
    const { staff: staff_id } = staffId;
    console.log(staff_id);
    if (order_id && staff_id) {
      const data = await orderApi.approveOnlineOrder(order_id);
      await orderApi.assignOnlineOrderToStaff({ staff_id, order_id });
      dispatch({ type: APPROVE_ONLINE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: APPROVE_ONLINE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const cancelOnlineOrderAction = (id) => async (dispatch) => {
  dispatch({
    type: CANCEL_ONLINE_ORDER_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await orderApi.cancelOnlineOrder(id);
      dispatch({ type: CANCEL_ONLINE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CANCEL_ONLINE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const rejectOnlineOrderAction = (id) => async (dispatch) => {
  dispatch({
    type: REJECT_ONLINE_ORDER_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await orderApi.rejectOrder(id);
      dispatch({ type: REJECT_ONLINE_ORDER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: REJECT_ONLINE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const exportExcelAction = (orderId) => async () => {
  try {
    const data = await orderApi.exportOrderToExcel(orderId);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bill_of_order_#${orderId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// export const createStore = (storeModels) => async (dispatch) => {
//   dispatch({
//     type: CREATE_STORE_REQUEST,
//     payload: { storeModels },
//   });
//   try {
//     if (storeModels) {
//       const param = {
//         store_name: storeModels.storeName,
//         store_address: storeModels.storeAddress,
//         store_phone: storeModels.phone,
//       };
//       const data = await storeApi.createNewStore(param);
//       dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: CREATE_STORE_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const deleteStore = (storeId) => async (dispatch) => {
//   // console.log("DeleteStore");
//   // console.log(storeId);
//   dispatch({
//     type: DELETE_STORE_REQUEST,
//     payload: { storeId },
//   });
//   try {
//     const data = await storeApi.deleteStoreService(storeId);
//     dispatch({ type: DELETE_STORE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: DELETE_STORE_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };
