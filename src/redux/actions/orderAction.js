import orderApi from "../../api/orderApi";
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
} from "../../service/Validations/VarConstant";

export const listOrder = (status) => async (dispatch) => {
  const params = {
    OrderType: status,
  };
  if (status) {
    dispatch({ type: ONLINE_ORDER_LIST_REQUEST });
  } else {
    dispatch({ type: OFFLINE_ORDER_LIST_REQUEST });
  }
  try {
    if (status) {
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

export const viewDetailOfflineOrder = (orderId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST,
    payload: { orderId },
  });
  try {
    const data = await orderApi.getOrderDetailById(orderId);
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
