import inventoryApi from "../../api/inventoryApi";
import {
  GET_INVENTORY_PRODUCT_LIST_REQUEST,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS,
  GET_INVENTORY_PRODUCT_LIST_FAIL,
  QUANTITY_ADJUSTMENT_INVENTORY_REQUEST,
  QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS,
  QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
  GET_LIST_INVENTORY_REQUEST,
  GET_LIST_INVENTORY_SUCCESS,
  GET_LIST_INVENTORY_FAIL,
  GET_DETAIL_INVENTORY_REQUEST,
  GET_DETAIL_INVENTORY_SUCCESS,
  GET_DETAIL_INVENTORY_FAIL,
  CREATE_INVENTORY_NOTE_REQUEST,
  CREATE_INVENTORY_NOTE_SUCCESS,
  CREATE_INVENTORY_NOTE_FAIL,
  QUANTITY_ADJUSTMENT_TRIGGER_SUCCESS_NOTIFICATION,
} from "../../service/Validations/VarConstant";

export const getInventoryAction = (para, inventoryNoteId) => async (dispatch) => {
  console.log(para);
  const listProduct = Array.from(para.values());
  const listProductHandleParse = [];
  const listProductSendToBE = [];
  const listFormatProductSendToBE = [];
  listProduct.forEach((product) => {
    const inforIdProduct = product.product_id.split("+");
    console.log(product);
    console.log(inforIdProduct);
    const parseProduct = {
      ...product,
      product_id: parseInt(inforIdProduct[1], 10),
      colour_id: parseInt(inforIdProduct[0], 10),
      size_id: parseInt(inforIdProduct[2], 10),
    };
    listProductHandleParse.push(parseProduct);
  });
  listProductHandleParse.forEach((product) => {
    if (product) {
      const { id, product_name, ...rest } = product;
      listProductSendToBE.push(rest);
    }
  });
  listProductSendToBE.forEach((product) => {
    if (product) {
      const { product_id, size_id, colour_id, real_quantity, product_detail_id } = product;
      listFormatProductSendToBE.push({
        product_id,
        size_id,
        colour_id,
        real_quantity,
        product_detail_id,
      });
    }
  });
  dispatch({
    type: GET_INVENTORY_PRODUCT_LIST_REQUEST,
  });
  try {
    const params = {
      inventory_note_id: inventoryNoteId,
      list_products: listFormatProductSendToBE,
    };
    const data = await inventoryApi.getInventoryInStore(params);
    dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: GET_INVENTORY_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const quantityAdjusmentAction = (para, inventoryNoteId) => async (dispatch) => {
  console.log(para);
  const listProduct = Array.from(para.values());
  const listProductHandleParse = [];
  const listProductSendToBE = [];
  const listFormatProductSendToBE = [];
  listProduct.forEach((product) => {
    console.log(product);
    const inforIdProduct = product.product_id.split("+");
    console.log(inforIdProduct);

    const parseProduct = {
      ...product,
      product_id: parseInt(inforIdProduct[1], 10),
      colour_id: parseInt(inforIdProduct[0], 10),
      size_id: parseInt(inforIdProduct[2], 10),
    };
    listProductHandleParse.push(parseProduct);
  });

  console.log(listProductHandleParse);
  listProductHandleParse.forEach((product) => {
    if (product) {
      const { id, product_name, ...rest } = product;
      listProductSendToBE.push(rest);
    }
  });
  listProductSendToBE.forEach((product) => {
    if (product) {
      const { difference_quantity, product_detail_id } = product;
      listFormatProductSendToBE.push({
        inventory_note_id: inventoryNoteId,
        difference_quantity,
        product_detail_id,
      });
    }
  });
  dispatch({
    type: QUANTITY_ADJUSTMENT_INVENTORY_REQUEST,
  });
  try {
    const data = await inventoryApi.quantityAdjustment(listFormatProductSendToBE);
    dispatch({ type: QUANTITY_ADJUSTMENT_TRIGGER_SUCCESS_NOTIFICATION, payload: data.is_success });
    dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listInventoryNoteAction = (keySearch, page, size) => async (dispatch) => {
  console.log(keySearch);
  dispatch({ type: GET_LIST_INVENTORY_REQUEST });
  try {
    const param = {
      InventoryNoteName: keySearch.trim(),
      PageNumber: page,
      PageSize: size,
    };

    const data = await inventoryApi.getAdjustListInStore(param);
    console.log(data);
    dispatch({ type: GET_LIST_INVENTORY_SUCCESS, payload: data });
    dispatch({ type: GET_LIST_INVENTORY_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: GET_LIST_INVENTORY_FAIL, payload: message });
  }
};

export const viewDetailInventoryNoteAction = (inventoryId) => async (dispatch) => {
  dispatch({
    type: GET_DETAIL_INVENTORY_REQUEST,
  });
  try {
    const data = await inventoryApi.getDetailAdjustListInStore(inventoryId);
    dispatch({ type: GET_DETAIL_INVENTORY_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: GET_DETAIL_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const createInventoryNoteAction = (para, from_date, to_date) => async (dispatch) => {
  dispatch({
    type: CREATE_INVENTORY_NOTE_REQUEST,
  });
  try {
    const param = {
      inventory_note_name: para.inventory_note_name,
      from_date,
      to_date,
    };
    const data = await inventoryApi.createInventoryNote(param);
    dispatch({ type: CREATE_INVENTORY_NOTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_INVENTORY_NOTE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const exportExcelAction = (inventoryId) => async () => {
  try {
    const data = await inventoryApi.exportInventoryNoteToExcel(inventoryId);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inventory_note_#${inventoryId}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
};
