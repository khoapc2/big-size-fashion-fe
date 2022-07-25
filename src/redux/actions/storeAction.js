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
  VIEW_DETAIL_STORE_REQUEST,
  VIEW_DETAIL_STORE_SUCCESS,
  VIEW_DETAIL_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  STORE_LIST_DROPDOWN_REQUEST,
  STORE_LIST_DROPDOWN_SUCCESS,
  STORE_LIST_DROPDOWN_FAIL,
  ACTIVE_STORE_LIST_DROPDOWN_REQUEST,
  ACTIVE_STORE_LIST_DROPDOWN_SUCCESS,
  ACTIVE_STORE_LIST_DROPDOWN_FAIL,
  GET_MAINWAREHOUSE_REQUEST,
  GET_MAINWAREHOUSE_SUCCESS,
  GET_MAINWAREHOUSE_FAIL,
} from "../../service/Validations/VarConstant";

export const listStore =
  ({ keySearch, status }) =>
  async (dispatch) => {
    try {
      if (!status) {
        dispatch({ type: STORE_LIST_REQUEST });
        if (!keySearch) {
          const data = await storeApi.getListStore();
          data.content = data.content.filter((item) => item.is_main_warehouse === false);
          dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
          dispatch({ type: STORE_LIST_FAIL, payload: "" });
        } else {
          const searchParams = {
            StoreAddress: keySearch,
          };
          const data = await storeApi.getSearchListStore(searchParams);
          data.content = data.content.filter((item) => item.is_main_warehouse === false);
          dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
          dispatch({ type: STORE_LIST_FAIL, payload: "" });
        }
      } else {
        dispatch({ type: STORE_LIST_DROPDOWN_REQUEST });
        const params = {
          Status: status,
        };
        const data = await storeApi.getListStore(params);
        data.content = data.content.filter((item) => item.is_main_warehouse === false);
        dispatch({ type: STORE_LIST_DROPDOWN_SUCCESS, payload: data.content });
        dispatch({ type: STORE_LIST_DROPDOWN_FAIL, payload: "" });
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
  dispatch({
    type: CREATE_STORE_REQUEST,
    payload: { storeModels },
  });
  try {
    if (storeModels) {
      const param = {
        store_name: storeModels.storeName,
        store_address: storeModels.storeAddress,
        store_phone: storeModels.phone,
      };
      const data = await storeApi.createNewStore(param);
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
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (storeId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_STORE_REQUEST,
    payload: { storeId },
  });
  try {
    const data = await storeApi.getStoreDetailById(storeId);
    dispatch({ type: VIEW_DETAIL_STORE_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateStore = (storeModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_STORE_REQUEST,
    payload: { storeModels },
  });
  try {
    if (storeModels) {
      const param = {
        store_name: storeModels.storeName,
        store_address: storeModels.storeAddress,
        store_phone: storeModels.phone,
      };
      const data = await storeApi.updateStoreService(param, id);
      dispatch({ type: UPDATE_STORE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listActiveStore = (param) => async (dispatch) => {
  dispatch({ type: ACTIVE_STORE_LIST_DROPDOWN_REQUEST });
  try {
    const params = {
      IsMainWarehouse: param.mainWareHouse,
      Status: param.status,
    };
    console.log(params);
    const data = await storeApi.getListStore(params);
    console.log(data);
    dispatch({ type: ACTIVE_STORE_LIST_DROPDOWN_SUCCESS, payload: data.content });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: ACTIVE_STORE_LIST_DROPDOWN_FAIL, payload: message });
  }
};

export const getMainWareHouseAction = () => async (dispatch) => {
  dispatch({ type: GET_MAINWAREHOUSE_REQUEST });
  try {
    const params = {
      IsMainWarehouse: true,
      Status: true,
    };
    const { content } = await storeApi.getListStore(params);
    dispatch({ type: GET_MAINWAREHOUSE_SUCCESS, payload: content });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: GET_MAINWAREHOUSE_FAIL, payload: message });
  }
};
