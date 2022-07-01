import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listCustomerReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case CUSTOMER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
