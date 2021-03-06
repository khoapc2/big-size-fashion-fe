import {
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listManagerReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case MANAGER_LIST_REQUEST:
      return { ...state, loading: true };
    case MANAGER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case MANAGER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
