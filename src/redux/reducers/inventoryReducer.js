import {
  GET_INVENTORY_PRODUCT_LIST_REQUEST,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS,
  GET_INVENTORY_PRODUCT_LIST_FAIL,
  QUANTITY_ADJUSTMENT_INVENTORY_REQUEST,
  QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS,
  QUANTITY_ADJUSTMENT_INVENTORY_FAIL,
} from "../../service/Validations/VarConstant";

function formatArray(payload) {
  let result = [];
  if (payload) {
    const { list_products } = payload;
    result = list_products.map((obj, index) => ({
      ...obj,
      product_name: `${obj.product_name} - ${obj.colour_name} - ${obj.size_name}`,
      product_id: `${obj.colour_id}+${obj.product_id}+${obj.size_id}`,
      id: index,
    }));
  }
  return result;
}

export const getStorewarehouseReducer = (
  state = { loading: true, data: [], error: "", list_products: [] },
  action
) => {
  switch (action.type) {
    case GET_INVENTORY_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_INVENTORY_PRODUCT_LIST_SUCCESS:
      return { data: action.payload, loading: false, list_products: formatArray(action.payload) };
    case GET_INVENTORY_PRODUCT_LIST_FAIL:
      console.log(action.payload);
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const quantityAjustmentReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case QUANTITY_ADJUSTMENT_INVENTORY_REQUEST:
      return { ...state, loading: true };
    case QUANTITY_ADJUSTMENT_INVENTORY_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case QUANTITY_ADJUSTMENT_INVENTORY_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
