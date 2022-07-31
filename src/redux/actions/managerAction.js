import accountApi from "../../api/accountApi";
import {
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
  VIEW_OWN_PROFILE_REQUEST,
  VIEW_OWN_PROFILE_FAIL,
  VIEW_OWN_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listManager = (keySearch, role, page, size) => async (dispatch) => {
  console.log(role);
  dispatch({ type: MANAGER_LIST_REQUEST });
  try {
    if (role === "Admin") {
      console.log("Admin come here");

      const params = {
        Role: "Manager",
        Status: "Both",
        PageNumber: page,
        PageSize: size,
      };
      const searchParams = {
        Fullname: keySearch,
        Role: "Manager",
        Status: "Both",
        PageNumber: page,
        PageSize: size,
      };
      if (!keySearch) {
        const data = await accountApi.getListAccount(params);
        console.log(data);
        dispatch({ type: MANAGER_LIST_SUCCESS, payload: data });
        dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
      } else {
        console.log("yo");
        const data = await accountApi.getSearchListAccount(searchParams);
        dispatch({ type: MANAGER_LIST_SUCCESS, payload: data });
        dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
      }
    } else if (role === "Owner") {
      console.log("Owner come here");

      const params = {
        Fullname: keySearch,
      };
      const data = await accountApi.getManagerForOwner(params);
      dispatch({ type: MANAGER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: MANAGER_LIST_FAIL, payload: message });
  }
};

export const viewOwnProfile = () => async (dispatch) => {
  dispatch({
    type: VIEW_OWN_PROFILE_REQUEST,
  });
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let data = null;
    if (currentUser.role === "Manager") {
      data = await accountApi.getManagerProfile();
    } else if (currentUser.role === "Admin" || currentUser.role === "Owner") {
      data = await accountApi.getAdminOwnerProfile();
    }
    const names = data.content.fullname.split(" ");
    data.content.name = `Mr. ${names[names.length - 1]}`;
    dispatch({ type: VIEW_OWN_PROFILE_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_OWN_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProfile = (profileModels) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_REQUEST,
  });
  try {
    if (profileModels) {
      let birthDay;
      if (profileModels.birthday.toString().includes("/")) {
        birthDay = profileModels.birthday.split("/").reverse().join("/");
      } else {
        birthDay = profileModels.birthday.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
      const param = {
        fullname: profileModels.fullname,
        phone_number: profileModels.phone_number,
        email: profileModels.email,
        birthday: birthDay,
      };
      console.log(param);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      let data = null;
      if (currentUser.role === "Manager") {
        data = await accountApi.updateManagerProfile(param);
      } else if (currentUser.role === "Admin" || currentUser.role === "Owner") {
        data = await accountApi.updateAdminProfile(param);
      }
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
