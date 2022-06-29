import categoryApi from "../../api/categoryApi";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listCategory = (keySearch) => async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await categoryApi.getListCategory();
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.content });
      dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: CATEGORY_LIST_FAIL, payload: message });
  }
};
