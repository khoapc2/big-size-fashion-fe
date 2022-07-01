import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
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

export const createStoreReducer = (state = {}, action) => {
  console.log(state, action);
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

export const deleteStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STORE_REQUEST:
      return { ...state, loading: true };
    case DELETE_STORE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_STORE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
