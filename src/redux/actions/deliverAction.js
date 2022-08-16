import deliveryApi from "../../api/deliveryApi";
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
  VIEW_DETAIL_DELIVERY_NOTE_REQUEST,
  VIEW_DETAIL_DELIVERY_NOTE_FAIL,
  VIEW_DETAIL_DELIVERY_NOTE_SUCCESS,
  APPROVE_DELIVERY_NOTE_REQUEST,
  APPROVE_DELIVERY_NOTE_SUCCESS,
  APPROVE_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_REQUEST,
  REJECT_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_SUCCESS,
  CANCEL_DELIVERY_NOTE_REQUEST,
  CANCEL_DELIVERY_NOTE_SUCCESS,
  CANCEL_DELIVERY_NOTE_FAIL,
  DELIVERY_CART,
  DELIVERY_CART_ACTION_SUCCESS,
  DELIVERY_CART_ACTION_FAIL,
} from "../../service/Validations/VarConstant";

export const listImportDeliver = (page, size) => async (dispatch) => {
  dispatch({ type: IMPORT_DELIVER_LIST_REQUEST });
  try {
    const param = {
      PageNumber: page,
      PageSize: size,
    };
    const data = await deliveryApi.getImportList(param);
    dispatch({ type: IMPORT_DELIVER_LIST_SUCCESS, payload: data });
    dispatch({ type: IMPORT_DELIVER_LIST_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: IMPORT_DELIVER_LIST_FAIL, payload: message });
  }
};
export const listExportDeliver = (page, size) => async (dispatch) => {
  dispatch({ type: EXPORT_DELIVER_LIST_REQUEST });
  try {
    const param = {
      PageNumber: page,
      PageSize: size,
    };
    const data = await deliveryApi.getExportList(param);
    dispatch({ type: EXPORT_DELIVER_LIST_SUCCESS, payload: data });
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: message });
  }
};

export const viewDetailDeliveryNoteAction = (id) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_DELIVERY_NOTE_REQUEST,
    payload: { id },
  });
  try {
    const data = await deliveryApi.getDeliveryNoteDetailById(id);
    dispatch({ type: VIEW_DETAIL_DELIVERY_NOTE_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_DELIVERY_NOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deliveryImportToMainWareHouseAction =
  (para, deliveryName, store_id) => async (dispatch) => {
    console.log(store_id);
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
        product_deatil_id: product.product_detail_id,
      };
      listProductHandleParse.push(parseProduct);
    });
    listProductHandleParse.forEach((product) => {
      if (product) {
        const { id, product_name, product_detail_id, ...rest } = product;
        listProductSendToBE.push(rest);
      }
    });
    dispatch({
      type: CREATE_IMPORT_PRODUCT_LIST_REQUEST,
    });
    try {
      const paramsForApiImport = {
        delivery_note_name: deliveryName,
        from_store_id: store_id,
        list_products: listProductSendToBE,
      };
      const data = await deliveryApi.createDeliveryNote(paramsForApiImport);
      dispatch({ type: CREATE_IMPORT_PRODUCT_LIST_SUCCESS, payload: data.content });
    } catch (error) {
      dispatch({
        type: CREATE_IMPORT_PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.error.message
            ? error.response.data.error.message
            : error.message,
      });
    }
  };

export const listExportDeliverAdmin = (page, size) => async (dispatch) => {
  dispatch({ type: EXPORT_DELIVER_LIST_REQUEST });
  try {
    const param = {
      PageNumber: page,
      PageSize: size,
    };
    const data = await deliveryApi.adminGetExportList(param);
    dispatch({ type: EXPORT_DELIVER_LIST_SUCCESS, payload: data });
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: EXPORT_DELIVER_LIST_FAIL, payload: message });
  }
};

export const approveDeliveryAction = (id) => async (dispatch) => {
  dispatch({
    type: APPROVE_DELIVERY_NOTE_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await deliveryApi.approveDelivery(id);
      dispatch({ type: APPROVE_DELIVERY_NOTE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: APPROVE_DELIVERY_NOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const rejectDeliveryAction = (id) => async (dispatch) => {
  dispatch({
    type: REJECT_DELIVERY_NOTE_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await deliveryApi.rejectDelivery(id);
      dispatch({ type: REJECT_DELIVERY_NOTE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: REJECT_DELIVERY_NOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const cancelDeliveryAction = (id) => async (dispatch) => {
  dispatch({
    type: CANCEL_DELIVERY_NOTE_REQUEST,
    payload: { id },
  });
  try {
    if (id) {
      const data = await deliveryApi.cancelDelivery(id);
      dispatch({ type: CANCEL_DELIVERY_NOTE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CANCEL_DELIVERY_NOTE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deliverCartAction = (products, delivery_cart) => async (dispatch) => {
  try {
    if (delivery_cart) {
      await products.forEach((product) => {
        const find_product = delivery_cart.find(
          (product_in_cart) => product.product_detail_id === product_in_cart.product_detail_id
        );

        if (find_product) {
          find_product.quantity += product.required_quantity;
        } else {
          const new_product = {
            id: delivery_cart.length + 1,
            product_name: `${product.product_name} - ${product.colour_name} - ${product.size_name}`,
            quantity: product.required_quantity,
            product_id: `${product.colour_id}+${product.product_id}+${product.size_id}`,
            product_detail_id: product.product_detail_id,
          };
          delivery_cart.push(new_product);
        }
      });
    }
    dispatch({ type: DELIVERY_CART, payload: delivery_cart });
    dispatch({ type: DELIVERY_CART_ACTION_SUCCESS, payload: true });
  } catch (error) {
    dispatch({
      type: DELIVERY_CART_ACTION_FAIL,
      payload: error,
    });
  }
};

export const addToDeliverNoteAction = (deliveryNote, product) => async (dispatch) => {
  try {
    if (product && deliveryNote.length > 0) {
      const { product_id, product_name, quantity, product_detail_id } = product;
      const newProduct = {
        id: deliveryNote.length + 1,
        product_name,
        quantity,
        product_id,
        product_detail_id,
      };
      const newCart = [...deliveryNote, newProduct];
      dispatch({ type: DELIVERY_CART, payload: newCart });
      dispatch({ type: DELIVERY_CART_ACTION_SUCCESS, payload: true });
    }
  } catch (error) {
    dispatch({
      type: DELIVERY_CART_ACTION_FAIL,
      payload: error,
    });
  }
};

export const removeProductFromDeliverNoteAction = (deliveryNote, productId) => async (dispatch) => {
  try {
    if (productId && deliveryNote.length > 0) {
      const newCart = deliveryNote.filter((e) => e.id !== productId);
      dispatch({ type: DELIVERY_CART, payload: newCart });
      dispatch({ type: DELIVERY_CART_ACTION_SUCCESS, payload: true });
    }
  } catch (error) {
    dispatch({
      type: DELIVERY_CART_ACTION_FAIL,
      payload: error,
    });
  }
};

// export const cancelOnlineOrderAction = (id) => async (dispatch) => {
//   dispatch({
//     type: CANCEL_DELIVERY_NOTE_REQUEST,
//     payload: { id },
//   });
//   try {
//     if (id) {
//       const data = await orderApi.rejectOrder(id);
//       dispatch({ type: CANCEL_DELIVERY_NOTE_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({
//       type: CANCEL_DELIVERY_NOTE_FAIL,
//       payload:
//         error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };
