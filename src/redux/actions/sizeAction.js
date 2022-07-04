import sizeApi from "../../api/sizeApi";
import {
  SIZE_LIST_REQUEST,
  SIZE_LIST_SUCCESS,
  SIZE_LIST_FAIL,
  CREATE_SIZE_REQUEST,
  CREATE_SIZE_SUCCESS,
  CREATE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_SUCCESS,
  DELETE_SIZE_FAIL,
  VIEW_DETAIL_SIZE_REQUEST,
  VIEW_DETAIL_SIZE_SUCCESS,
  VIEW_DETAIL_SIZE_FAIL,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
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
        } else {
          const searchParams = {
            Size: keySearch,
          };
          const data = await sizeApi.getSearchListSize(searchParams);
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

export const createSize = (sizeModels) => async (dispatch) => {
  dispatch({
    type: CREATE_SIZE_REQUEST,
    payload: { sizeModels },
  });
  try {
    if (sizeModels) {
      const param = {
        size_name: sizeModels.size,
      };
      const data = await sizeApi.createNewSize(param);
      dispatch({ type: CREATE_SIZE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteSize = (sizeId) => async (dispatch) => {
  // console.log("DeleteSize");
  // console.log(sizeId);
  dispatch({
    type: DELETE_SIZE_REQUEST,
    payload: { sizeId },
  });
  try {
    const data = await sizeApi.deleteSizeService(sizeId);
    dispatch({ type: DELETE_SIZE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (sizeId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_SIZE_REQUEST,
    payload: { sizeId },
  });
  try {
    const data = await sizeApi.getSizeDetailById(sizeId);
    dispatch({ type: VIEW_DETAIL_SIZE_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_SIZE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateSize = (sizeModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_SIZE_REQUEST,
    payload: { sizeModels },
  });
  try {
    if (sizeModels) {
      const param = {
        size_name: sizeModels.size,
      };
      const data = await sizeApi.updateSizeService(param, id);
      dispatch({ type: UPDATE_SIZE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SIZE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
