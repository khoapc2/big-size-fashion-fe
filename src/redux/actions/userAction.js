import Axios from "axios";
import userApi from "../../api/userApi";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  TRIGGER_RELOAD,
} from "../../service/Validations/UserConstant";
// try {
//   const response = await .({ username, password });
//   const user = JSON.stringify(response.content);
//   console.log(user);
//   localStorage.setItem("user", user);
// } catch (err) {
//   console.log(err);
// }

export const guestLogin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  console.log("come here");
  try {
    console.log(username, password);
    console.log(await userApi.login({ username, password }));
    const { content } = await userApi.login({ username, password });
    // const { data } = await Axios.post("https://20.211.17.194/api/v1/accounts/login", {
    //   username,
    //   password,
    // });
    console.log(content);
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

export const userLoggin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  try {
    console.log(username, password);
    // const { data } = await userApi.login({ username, password });
    const { data } = await Axios.post("https://20.211.17.194/api/v1/accounts", {
      username,
      password,
    });
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data.content));
  } catch (error) {
    console.log(error);
    const message =
      error.respone && error.respone.data.message ? error.respone.data.message : error.message;
    dispatch({ type: USER_LOGIN_FAIL, payload: message });
  }
};

// export const ee = (username, password) => async (dispatch) => {
//     dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
//     try {
//       const { data } = await userApi.login({ username, password });
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
//       localStorage.setItem("user", JSON.stringify(data.content));
//     } catch (error) {
//       console.log(error);
//       const message =
//         error.respone && error.respone.data.message ? error.respone.data.message : error.message;
//       dispatch({ type: USER_LOGIN_FAIL, payload: message });
//     }
// };

export const triggerReload = () => async (dispatch) => {
  dispatch({
    type: TRIGGER_RELOAD,
    payload: {},
  });
};
