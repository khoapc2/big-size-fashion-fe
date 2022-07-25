import feedbackApi from "../../api/feedbackApi";
import {
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
  FEEDBACK_LIST_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_FAIL,
  DELETE_FEEDBACK_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listFeedback = (id) => async (dispatch) => {
  const params = {
    SortBy: "CreateDate",
  };
  dispatch({ type: FEEDBACK_LIST_REQUEST });
  try {
    if (id) {
      const data = await feedbackApi.getListFeedback(params, id);
      dispatch({ type: FEEDBACK_LIST_SUCCESS, payload: data });
      dispatch({ type: FEEDBACK_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: FEEDBACK_LIST_FAIL, payload: message });
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_FEEDBACK_REQUEST,
    payload: { id },
  });
  try {
    const data = await feedbackApi.deleteFeedback(id);
    dispatch({ type: DELETE_FEEDBACK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_FEEDBACK_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
