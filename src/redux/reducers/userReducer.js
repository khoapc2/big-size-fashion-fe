import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  TRIGGER_RELOAD,
  USER_TOKEN,
} from "../../service/Validations/VarConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const reloadReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIGGER_RELOAD:
      return { ...state };
    default:
      return state;
  }
};

export const userTokenReducer = (state = { userToken: "" }, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
};
