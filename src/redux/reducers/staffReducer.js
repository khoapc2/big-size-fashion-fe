import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listStaffReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { ...state, loading: true };
    case STAFF_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STAFF_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
