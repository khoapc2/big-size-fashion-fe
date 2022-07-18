import inventoryApi from "../../api/inventoryApi";
import {
  GET_INVENTORY_PRODUCT_LIST_REQUEST,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS,
  GET_INVENTORY_PRODUCT_LIST_FAIL,
  QUANTITY_ADJUSTMENT_INVENTORY_REQUEST,
  QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS,
  QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
} from "../../service/Validations/VarConstant";

export const getInventoryAction = (para, from_date, to_date) => async (dispatch) => {
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
      const { product_id, size_id, colour_id, real_quantity } = product;
      listFormatProductSendToBE.push({ product_id, size_id, colour_id, real_quantity });
    }
  });
  console.log(listFormatProductSendToBE);
  dispatch({
    type: GET_INVENTORY_PRODUCT_LIST_REQUEST,
  });
  try {
    const params = {
      from_date,
      to_date,
      list_products: listFormatProductSendToBE,
    };
    console.log(params);
    const data = await inventoryApi.getInventoryInStore(params);
    dispatch({ type: GET_INVENTORY_PRODUCT_LIST_SUCCESS, payload: data.content });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_INVENTORY_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const quantityAdjusmentAction = (para) => async (dispatch) => {
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
      const { product_id, size_id, colour_id, difference_quantity } = product;
      listFormatProductSendToBE.push({ product_id, size_id, colour_id, difference_quantity });
    }
  });
  dispatch({
    type: QUANTITY_ADJUSTMENT_INVENTORY_REQUEST,
  });
  try {
    const data = await inventoryApi.quantityAdjustment(listFormatProductSendToBE);
    console.log(data);
    dispatch({ type: QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
