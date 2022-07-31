import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  VIEW_DETAIL_PRODUCT_REQUEST,
  VIEW_DETAIL_PRODUCT_SUCCESS,
  VIEW_DETAIL_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  IMPORT_PRODUCT_LIST_REQUEST,
  IMPORT_PRODUCT_LIST_SUCCESS,
  IMPORT_PRODUCT_LIST_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../../service/Validations/VarConstant";

function formatArray(payload) {
  console.log(payload);
  let result = [];
  const newArray = [...payload];
  result = newArray.map(
    ({
      colour_id,
      colour_name,
      product_id,
      product_name,
      size_id,
      size_name,
      product_deatail_id,
    }) => ({
      key: `${colour_id}+${product_id}+${size_id}`,
      text: `${product_name} - ${colour_name} - ${size_name}`,
      value: `${colour_id}+${product_id}+${size_id}`,
      id: product_deatail_id,
    })
  );
  return result;
}

export const listProductReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailProductReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProductReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productImportInvoiceReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case IMPORT_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case IMPORT_PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, data: formatArray(action.payload) };
    case IMPORT_PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
