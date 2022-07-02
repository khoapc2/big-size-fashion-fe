import userApi from "../../api/userApi";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  TRIGGER_RELOAD,
  USER_LOGOUT,
} from "../../service/Validations/VarConstant";

export const guestLogin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  console.log("come here");
  try {
    console.log(username, password);
    console.log(await userApi.login({ username, password }));
    const { content } = await userApi.login({ username, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: content });
    localStorage.setItem("user", JSON.stringify(content));
  } catch (error) {
    // console.log(error);
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: USER_LOGIN_FAIL, payload: message });
  }
};

export const triggerReload = () => async (dispatch) => {
  dispatch({
    type: TRIGGER_RELOAD,
    payload: {},
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
};
