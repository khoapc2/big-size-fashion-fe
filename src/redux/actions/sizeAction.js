import sizeApi from "../../api/sizeApi";
import {
  SIZE_LIST_REQUEST,
  SIZE_LIST_SUCCESS,
  SIZE_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listSize =
  ({ keySearch, status }) =>
  async (dispatch) => {
    dispatch({ type: SIZE_LIST_REQUEST });
    try {
      if (!status) {
        if (!keySearch) {
          const data = await sizeApi.getListSize();
          dispatch({ type: SIZE_LIST_SUCCESS, payload: data.content });
          dispatch({ type: SIZE_LIST_FAIL, payload: "" });
        }
      } else {
        const params = {
          Status: status,
        };
        const data = await sizeApi.getListSize(params);
        dispatch({ type: SIZE_LIST_SUCCESS, payload: data.content });
        dispatch({ type: SIZE_LIST_FAIL, payload: "" });
      }

      // else {
      //   dispatch({ type: SIZE_LIST_SUCCESS, payload: data.content });
      //   dispatch({ type: SIZE_LIST_FAIL, payload: "" });
      // }
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: SIZE_LIST_FAIL, payload: message });
    }
  };
