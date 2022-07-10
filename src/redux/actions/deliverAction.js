import deliveryApi from "../../api/deliveryApi";
import {
  IMPORT_DELIVER_LIST_REQUEST,
  IMPORT_DELIVER_LIST_SUCCESS,
  IMPORT_DELIVER_LIST_FAIL,
  EXPORT_DELIVER_LIST_REQUEST,
  EXPORT_DELIVER_LIST_SUCCESS,
  EXPORT_DELIVER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listImportDeliver = () => async (dispatch) => {
  dispatch({ type: IMPORT_DELIVER_LIST_REQUEST });
  try {
    const data = await deliveryApi.getImportList();
    dispatch({ type: IMPORT_DELIVER_LIST_SUCCESS, payload: data.content });
    dispatch({ type: IMPORT_DELIVER_LIST_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: IMPORT_DELIVER_LIST_FAIL, payload: message });
  }
};
export const listExportDeliver = () => async (dispatch) => {
  dispatch({ type: EXPORT_DELIVER_LIST_REQUEST });
  try {
    const data = await deliveryApi.getExportList();
    dispatch({ type: EXPORT_DELIVER_LIST_SUCCESS, payload: data.content });
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: message });
  }
};

// export const viewDetailOfflineOrder = (orderId) => async (dispatch) => {
//   dispatch({
//     type: VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST,
//     payload: { orderId },
//   });
//   try {
//     const data = await orderApi.getOrderDetailById(orderId);
//     dispatch({ type: VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS, payload: data.content });
//   } catch (error) {
//     dispatch({
//       type: VIEW_DETAIL_OFFLINE_ORDER_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const approveOfflineOrderAction = (id) => async (dispatch) => {
//   dispatch({
//     type: APPROVE_OFFLINE_ORDER_REQUEST,
//     payload: { id },
//   });
//   try {
//     if (id) {
//       const data = await orderApi.approveOfflineOrder(id);
//       dispatch({ type: APPROVE_OFFLINE_ORDER_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: APPROVE_OFFLINE_ORDER_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const cancelOfflineOrderAction = (id) => async (dispatch) => {
//   dispatch({
//     type: CANCEL_OFFLINE_ORDER_REQUEST,
//     payload: { id },
//   });
//   try {
//     if (id) {
//       const data = await orderApi.rejectOrder(id);
//       dispatch({ type: CANCEL_OFFLINE_ORDER_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: CANCEL_OFFLINE_ORDER_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const approveOnlineOrderAction = (id, staffId) => async (dispatch) => {
//   dispatch({
//     type: APPROVE_ONLINE_ORDER_REQUEST,
//     payload: { id },
//   });
//   try {
//     const order_id = id;
//     const { staff: staff_id } = staffId;
//     console.log(staff_id);
//     if (order_id && staff_id) {
//       const data = await orderApi.approveOnlineOrder(order_id);
//       await orderApi.assignOnlineOrderToStaff({ staff_id, order_id });
//       dispatch({ type: APPROVE_ONLINE_ORDER_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: APPROVE_ONLINE_ORDER_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const cancelOnlineOrderAction = (id) => async (dispatch) => {
//   dispatch({
//     type: CANCEL_ONLINE_ORDER_REQUEST,
//     payload: { id },
//   });
//   try {
//     if (id) {
//       const data = await orderApi.rejectOrder(id);
//       dispatch({ type: CANCEL_ONLINE_ORDER_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: CANCEL_ONLINE_ORDER_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };
