import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
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

export const createStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STORE_REQUEST:
      return { ...state, loading: true };
    case CREATE_STORE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_STORE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
