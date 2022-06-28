import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listStoreReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case STORE_LIST_REQUEST:
      return { ...state, loading: true };
    case STORE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STORE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ee = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case STORE_LIST_REQUEST:
      return { ...state, loading: true };
    case STORE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STORE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
