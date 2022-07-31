import accountApi from "../../api/accountApi";
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  DISABLE_ACCOUNT_REQUEST,
  DISABLE_ACCOUNT_SUCCESS,
  DISABLE_ACCOUNT_FAIL,
  VIEW_DETAIL_ACCOUNT_REQUEST,
  VIEW_DETAIL_ACCOUNT_SUCCESS,
  VIEW_DETAIL_ACCOUNT_FAIL,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  RESET_PASSWORD_ACCOUNT_REQUEST,
  RESET_PASSWORD_ACCOUNT_SUCCESS,
  RESET_PASSWORD_ACCOUNT_FAIL,
} from "../../service/Validations/VarConstant";

export const listCustomer = (keySearch, page, size) => async (dispatch) => {
  const params = {
    Role: "Customer",
    Status: "Both",
    PageNumber: page,
    PageSize: size,
  };
  const searchParams = {
    Fullname: keySearch,
    Role: "Customer",
    Status: "Both",
    PageNumber: page,
    PageSize: size,
  };
  dispatch({ type: CUSTOMER_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await accountApi.getListAccount(params);
      dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
      dispatch({ type: CUSTOMER_LIST_FAIL, payload: "" });
    } else {
      const data = await accountApi.getSearchListAccount(searchParams);
      dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
      dispatch({ type: CUSTOMER_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: CUSTOMER_LIST_FAIL, payload: message });
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  // console.log("DeleteAccount");
  // console.log(accountId);
  dispatch({
    type: DISABLE_ACCOUNT_REQUEST,
    payload: { accountId },
  });
  const param = {
    uid: accountId,
  };
  try {
    const data = await accountApi.deleteAccountService(param);
    dispatch({ type: DISABLE_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DISABLE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (accountId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_ACCOUNT_REQUEST,
    payload: { accountId },
  });
  try {
    const data = await accountApi.getAccountDetailById(accountId);
    dispatch({ type: VIEW_DETAIL_ACCOUNT_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createAccount = (accountModels) => async (dispatch) => {
  dispatch({
    type: CREATE_ACCOUNT_REQUEST,
    payload: { accountModels },
  });
  try {
    if (accountModels) {
      console.log(accountModels);
      const param = {
        username: accountModels.username,
        password: accountModels.password,
        fullname: accountModels.fullname,
        phone_number: accountModels.phone_number,
        store_id: accountModels.store_id,
        role_account: accountModels.role_account,
      };
      console.log(param);
      const data = await accountApi.createNewAccount(param);
      dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetPassword = (accountModels, id) => async (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_ACCOUNT_REQUEST,
    payload: { accountModels },
  });
  try {
    if (accountModels) {
      const param = {
        new_password: accountModels.password,
      };
      const data = await accountApi.resetPasswordEmployee(param, id);
      dispatch({ type: RESET_PASSWORD_ACCOUNT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
