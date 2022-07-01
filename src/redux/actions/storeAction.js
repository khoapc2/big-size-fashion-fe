import storeApi from "../../api/storeApi";
import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
} from "../../service/Validations/VarConstant";

export const listStore = (keySearch, page) => async (dispatch) => {
  const params = {
    StoreAddress: keySearch,
  };
  dispatch({ type: STORE_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await storeApi.getListStore(page);
      dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STORE_LIST_FAIL, payload: "" });
    } else {
      console.log("data  colour in Search Action");
      const data = await storeApi.getSearchListStore(params);
      dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STORE_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: STORE_LIST_FAIL, payload: message });
  }
};

export const createStore = (storeModels) => async (dispatch) => {
  console.log(storeModels);
  dispatch({
    type: CREATE_STORE_REQUEST,
    payload: { storeModels },
  });
  try {
    if (storeModels) {
      const param = {
        store_address: storeModels.storeAddress,
        store_phone: storeModels.phone,
      };
      const { data } = await storeApi.createNewStore(param);
      console.log(data);
      dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteStore = (storeId) => async (dispatch) => {
  // console.log("DeleteStore");
  // console.log(storeId);
  dispatch({
    type: DELETE_STORE_REQUEST,
    payload: { storeId },
  });
  try {
    const data = await storeApi.deleteStoreService(storeId);
    dispatch({ type: DELETE_STORE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
