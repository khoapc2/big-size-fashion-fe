import categoryApi from "../../api/categoryApi";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_ALL_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listCategory =
  ({ keySearch = "", status }) =>
  async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    console.log(keySearch);
    try {
      if (!status) {
        if (!keySearch) {
          const data = await categoryApi.getListCategory();
          dispatch({ type: CATEGORY_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
        } else {
          console.log("??");
          const searchParams = {
            Category: keySearch,
          };
          const data = await categoryApi.getSearchListCategory(searchParams);
          dispatch({ type: CATEGORY_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
        }
      } else {
        const params = {
          Status: status,
        };
        const data = await categoryApi.getListCategory(params);
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
