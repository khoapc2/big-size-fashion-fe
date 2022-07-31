import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  DISABLE_ACCOUNT_REQUEST,
  DISABLE_ACCOUNT_SUCCESS,
  DISABLE_ACCOUNT_FAIL,
  VIEW_DETAIL_ACCOUNT_REQUEST,
  VIEW_DETAIL_ACCOUNT_SUCCESS,
  VIEW_DETAIL_ACCOUNT_FAIL,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  RESET_PASSWORD_ACCOUNT_REQUEST,
  RESET_PASSWORD_ACCOUNT_SUCCESS,
  RESET_PASSWORD_ACCOUNT_FAIL,
} from "../../service/Validations/VarConstant";

export const listCustomerReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case CUSTOMER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case DISABLE_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case DISABLE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DISABLE_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailAccountReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_ACCOUNT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case CREATE_ACCOUNT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case RESET_PASSWORD_ACCOUNT_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case RESET_PASSWORD_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
