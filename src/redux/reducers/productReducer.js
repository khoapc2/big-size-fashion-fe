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
} from "../../service/Validations/VarConstant";

export const listProductReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
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

export const updateProductReducer = (state = { loading: true }, action) => {
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
