import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  COLOR_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listColorReducer = (state = { loading: true, color: [], error: "" }, action) => {
  switch (action.type) {
    case COLOR_LIST_REQUEST:
      return { ...state, loading: true };
    case COLOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        color: action.payload,
      };
    case COLOR_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
