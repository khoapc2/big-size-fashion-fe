import {
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
  FEEDBACK_LIST_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listFeedbackReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case FEEDBACK_LIST_REQUEST:
      return { ...state, loading: true };
    case FEEDBACK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case FEEDBACK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FEEDBACK_REQUEST:
      return { ...state, loading: true };
    case DELETE_FEEDBACK_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_FEEDBACK_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
