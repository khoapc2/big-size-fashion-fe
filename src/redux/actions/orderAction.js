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
  STATISTIC_TODAY_ORDER_REQUEST,
  STATISTIC_TODAY_ORDER_SUCCESS,
  STATISTIC_TODAY_ORDER_FAIL,
  STAFF_PERFORM_ORDER_REQUEST,
  STAFF_PERFORM_ORDER_SUCCESS,
  STAFF_PERFORM_ORDER_FAIL,
  CHANGE_PAYMENT_METHOD_REQUEST,
  CHANGE_PAYMENT_METHOD_SUCCESS,
  CHANGE_PAYMENT_METHOD_FAIL,
} from "../../service/Validations/VarConstant";

export const listOrder = (status, type, page, size) => async (dispatch) => {
  const params = {
    OrderStatus: status,
    OrderType: type,
    PageNumber: page,
    PageSize: size,
  };
  if (type) {
    dispatch({ type: ONLINE_ORDER_LIST_REQUEST });
  } else {
    dispatch({ type: OFFLINE_ORDER_LIST_REQUEST });
  }
  try {
    if (type) {
      const data = await orderApi.getListOrder(params);
      dispatch({ type: ONLINE_ORDER_LIST_SUCCESS, payload: data });
      dispatch({ type: ONLINE_ORDER_LIST_FAIL, payload: "" });
    } else {
      const data = await orderApi.getListOrder(params);
      dispatch({ type: OFFLINE_ORDER_LIST_SUCCESS, payload: data });
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
    if (data.content.status === "Chờ xác nhận") {
      const { content } = await orderApi.getPendingOrderDetailById(orderId);
      dispatch({ type: VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS, payload: content });
    } else {
      dispatch({ type: VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS, payload: data.content });
    }
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
  } catch (error) {
    console.log(error);
  }
};

export const orderTodayAction =
  (role, store_id = 0) =>
  async (dispatch) => {
    dispatch({
      type: STATISTIC_TODAY_ORDER_REQUEST,
    });
    try {
      if (role === "Manager") {
        const data = await orderApi.orderToday();
        dispatch({ type: STATISTIC_TODAY_ORDER_SUCCESS, payload: data.content });
      } else if (role === "Owner") {
        const data = await orderApi.orderTodayForOwner(store_id);
        dispatch({ type: STATISTIC_TODAY_ORDER_SUCCESS, payload: data.content });
      }
    } catch (error) {
      dispatch({
        type: STATISTIC_TODAY_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const staffPerformanceAction = (params) => async (dispatch) => {
  dispatch({
    type: STAFF_PERFORM_ORDER_REQUEST,
  });
  try {
    const param = {
      Month: params.month,
      Year: params.year,
    };
    const data = await orderApi.staffPerformOnOrder(param);
    dispatch({ type: STAFF_PERFORM_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STAFF_PERFORM_ORDER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const changePaymentMethodAction = (id, method) => async (dispatch) => {
  dispatch({ type: CHANGE_PAYMENT_METHOD_REQUEST });
  const param = {
    method,
  };
  try {
    const data = await orderApi.changePaymentMethod(id, param);
    dispatch({ type: CHANGE_PAYMENT_METHOD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: CHANGE_PAYMENT_METHOD_FAIL, payload: message });
  }
};
