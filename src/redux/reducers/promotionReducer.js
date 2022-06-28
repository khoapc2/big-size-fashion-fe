import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listPromotionReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case PROMOTION_LIST_REQUEST:
      return { ...state, loading: true };
    case PROMOTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case PROMOTION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
