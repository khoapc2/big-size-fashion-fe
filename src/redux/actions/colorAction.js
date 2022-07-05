import colorApi from "../../api/colorApi";
import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_FAIL,
  COLOR_LIST_ALL_SUCCESS,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_SUCCESS,
  CREATE_COLOR_FAIL,
  DELETE_COLOR_REQUEST,
  DELETE_COLOR_SUCCESS,
  DELETE_COLOR_FAIL,
  VIEW_DETAIL_COLOR_REQUEST,
  VIEW_DETAIL_COLOR_SUCCESS,
  VIEW_DETAIL_COLOR_FAIL,
  UPDATE_COLOR_REQUEST,
  UPDATE_COLOR_SUCCESS,
  UPDATE_COLOR_FAIL,
  COLOR_LIST_DROPDOWN_SUCCESS,
  COLOR_LIST_DROPDOWN_FAIL,
  COLOR_LIST_DROPDOWN_REQUEST,
} from "../../service/Validations/VarConstant";

export const listColor =
  ({ keySearch, status }) =>
  async (dispatch) => {
    try {
      if (!status) {
        dispatch({ type: COLOR_LIST_REQUEST });
        if (!keySearch) {
          const data = await colorApi.getListColor();
          dispatch({ type: COLOR_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: COLOR_LIST_FAIL, payload: "" });
        } else {
          console.log("data colour in Search Action");
          const searchParams = {
            Colour: keySearch,
          };
          const data = await colorApi.getSearchListColor(searchParams);
          dispatch({ type: COLOR_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: COLOR_LIST_FAIL, payload: "" });
        }
      } else {
        dispatch({ type: COLOR_LIST_DROPDOWN_REQUEST });
        const params = {
          Status: status,
        };
        const data = await colorApi.getListColor(params);
        dispatch({ type: COLOR_LIST_DROPDOWN_SUCCESS, payload: data.content });
        dispatch({ type: COLOR_LIST_DROPDOWN_FAIL, payload: "" });
      }
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: COLOR_LIST_FAIL, payload: message });
    }
  };

export const createColor = (colorModels) => async (dispatch) => {
  dispatch({
    type: CREATE_COLOR_REQUEST,
    payload: { colorModels },
  });
  try {
    if (colorModels) {
      const param = {
        colour_name: colorModels.color_name,
        colour_code: colorModels.color_code,
      };
      const data = await colorApi.createNewColor(param);
      dispatch({ type: CREATE_COLOR_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_COLOR_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteColor = (colorId) => async (dispatch) => {
  // console.log("DeleteColor");
  // console.log(colorId);
  dispatch({
    type: DELETE_COLOR_REQUEST,
    payload: { colorId },
  });
  try {
    const data = await colorApi.deleteColorService(colorId);
    dispatch({ type: DELETE_COLOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COLOR_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (colorId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_COLOR_REQUEST,
    payload: { colorId },
  });
  try {
    const data = await colorApi.getColorDetailById(colorId);
    dispatch({ type: VIEW_DETAIL_COLOR_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_COLOR_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateColor = (colorModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_COLOR_REQUEST,
    payload: { colorModels },
  });
  try {
    if (colorModels) {
      const param = {
        colour_name: colorModels.color_name,
        colour_code: colorModels.color_code,
      };
      const data = await colorApi.updateColorService(param, id);
      dispatch({ type: UPDATE_COLOR_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_COLOR_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
