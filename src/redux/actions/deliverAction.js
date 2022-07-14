import deliveryApi from "../../api/deliveryApi";
import storeApi from "../../api/storeApi";
import {
  IMPORT_DELIVER_LIST_REQUEST,
  IMPORT_DELIVER_LIST_SUCCESS,
  IMPORT_DELIVER_LIST_FAIL,
  EXPORT_DELIVER_LIST_REQUEST,
  EXPORT_DELIVER_LIST_SUCCESS,
  EXPORT_DELIVER_LIST_FAIL,
  CREATE_IMPORT_PRODUCT_LIST_REQUEST,
  CREATE_IMPORT_PRODUCT_LIST_SUCCESS,
  CREATE_IMPORT_PRODUCT_LIST_FAIL,
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

export const deliveryImportToMainWareHouseAction = (para, deliveryName) => async (dispatch) => {
  const listProduct = Array.from(para.values());
  const listProductHandleParse = [];
  const listProductSendToBE = [];
  listProduct.forEach((product) => {
    const inforIdProduct = product.product_id.split("+");
    const parseProduct = {
      ...product,
      product_id: parseInt(inforIdProduct[1], 10),
      colour_id: parseInt(inforIdProduct[0], 10),
      size_id: parseInt(inforIdProduct[2], 10),
    };
    console.log(parseProduct);
    listProductHandleParse.push(parseProduct);
  });
  listProductHandleParse.forEach((product) => {
    if (product) {
      const { id, product_name, ...rest } = product;
      listProductSendToBE.push(rest);
    }
  });
  dispatch({
    type: CREATE_IMPORT_PRODUCT_LIST_REQUEST,
  });
  try {
    const params = {
      IsMainWarehouse: true,
      Status: true,
    };
    const { content } = await storeApi.getListStore(params);
    const paramsForApiImport = {
      delivery_note_name: deliveryName,
      from_store_id: content[0].store_id,
      list_products: listProductSendToBE,
    };
    const data = await deliveryApi.createDeliveryNote(paramsForApiImport);
    dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: CREATE_IMPORT_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
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
