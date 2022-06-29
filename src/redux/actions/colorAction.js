import colorApi from "../../api/colorApi";
import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  COLOR_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listColor =
  ({ keySearch, status }) =>
  async (dispatch) => {
    console.log("test list color here");

    dispatch({ type: COLOR_LIST_REQUEST });
    try {
      if (!status) {
        if (!keySearch) {
          const data = await colorApi.getListColor();
          dispatch({ type: COLOR_LIST_SUCCESS, payload: data.content });
          dispatch({ type: COLOR_LIST_FAIL, payload: "" });
        }
      } else {
        const params = {
          Status: status,
        };
        const data = await colorApi.getListColor(params);
        console.log("data  colour in Action", data.content);
        dispatch({ type: COLOR_LIST_SUCCESS, payload: data.content });
        dispatch({ type: COLOR_LIST_FAIL, payload: "" });
      }
      // else {
      //   const data = await colorApi.getSearchListProduct(params);
      //   dispatch({ type: COLOR_LIST_REQUEST, payload: data.content });
      //   dispatch({ type: COLOR_LIST_FAIL, payload: "" });
      // }}
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: COLOR_LIST_FAIL, payload: message });
    }
  };
