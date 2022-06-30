import colorApi from "../../api/colorApi";
import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  COLOR_LIST_FAIL,
  COLOR_LIST_ALL_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listColor =
  ({ keySearch, status }) =>
  async (dispatch) => {
    dispatch({ type: COLOR_LIST_REQUEST });
    console.log(keySearch);
    try {
      if (!status) {
        if (!keySearch) {
          const data = await colorApi.getListColor();
          dispatch({ type: COLOR_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: COLOR_LIST_FAIL, payload: "" });
        } else {
          console.log("data  colour in Search Action");
          const searchParams = {
            Colour: keySearch,
          };
          const data = await colorApi.getSearchListColor(searchParams);
          dispatch({ type: COLOR_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: COLOR_LIST_FAIL, payload: "" });
        }
      } else {
        const params = {
          Status: status,
        };
        const data = await colorApi.getListColor(params);
        dispatch({ type: COLOR_LIST_SUCCESS, payload: data.content });
        dispatch({ type: COLOR_LIST_FAIL, payload: "" });
      }
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: COLOR_LIST_FAIL, payload: message });
    }
  };
