import {
  GET_INVENTORY_PRODUCT_LIST_REQUEST,
  GET_INVENTORY_PRODUCT_LIST_SUCCESS,
  GET_INVENTORY_PRODUCT_LIST_FAIL,
} from "../../service/Validations/VarConstant";

function formatArray(payload) {
  let result = [];
  if (payload) {
    const { list_products } = payload;
    result = list_products.map((obj, index) => ({
      ...obj,
      product_name: `${obj.product_name} - ${obj.colour_name} - ${obj.size_name}`,
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
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
