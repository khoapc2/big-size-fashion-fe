import promotionApi from "../../api/promotionApi";
import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  CREATE_PROMOTION_REQUEST,
  CREATE_PROMOTION_SUCCESS,
  CREATE_PROMOTION_FAIL,
  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAIL,
  VIEW_DETAIL_PROMOTION_REQUEST,
  VIEW_DETAIL_PROMOTION_SUCCESS,
  VIEW_DETAIL_PROMOTION_FAIL,
  UPDATE_PROMOTION_REQUEST,
  UPDATE_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_FAIL,
} from "../../service/Validations/VarConstant";

export const listPromotion = (keySearch, page) => async (dispatch) => {
  const params = {
    PromotionName: keySearch,
  };
  dispatch({ type: PROMOTION_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await promotionApi.getListPromotion(page);
      dispatch({ type: PROMOTION_LIST_SUCCESS, payload: data.content });
      dispatch({ type: PROMOTION_LIST_FAIL, payload: "" });
    } else {
      const data = await promotionApi.getSearchListPromotion(params);
      dispatch({ type: PROMOTION_LIST_SUCCESS, payload: data.content });
      dispatch({ type: PROMOTION_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: PROMOTION_LIST_FAIL, payload: message });
  }
};

export const createPromotion = (promotionModels) => async (dispatch) => {
  dispatch({
    type: CREATE_PROMOTION_REQUEST,
    payload: { promotionModels },
  });
  try {
    if (promotionModels) {
      const param = {
        promotion_name: promotionModels.promotion_name,
        promotion_value: promotionModels.promotion_value,
        apply_date: promotionModels.apply_date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        expired_date: promotionModels.expired_date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      };
      const data = await promotionApi.createNewPromotion(param);
      dispatch({ type: CREATE_PROMOTION_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deletePromotion = (promotionId) => async (dispatch) => {
  // console.log("DeletePromotion");
  // console.log(promotionId);
  dispatch({
    type: DELETE_PROMOTION_REQUEST,
    payload: { promotionId },
  });
  try {
    const data = await promotionApi.deletePromotionService(promotionId);
    dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (promotionId) => async (dispatch) => {
  console.log(promotionId);
  dispatch({
    type: VIEW_DETAIL_PROMOTION_REQUEST,
    payload: { promotionId },
  });
  try {
    const data = await promotionApi.getPromotionDetailById(promotionId);
    dispatch({ type: VIEW_DETAIL_PROMOTION_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updatePromotion = (promotionModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROMOTION_REQUEST,
    payload: { promotionModels },
  });
  try {
    if (promotionModels) {
      let param = {};
      if (promotionModels.apply_date.toString().includes("/")) {
        param = {
          promotion_name: promotionModels.promotion_name,
          promotion_value: promotionModels.promotion_value,
          apply_date: promotionModels.apply_date.split("/").reverse().join("/"),
          expired_date: promotionModels.expired_date.split("/").reverse().join("/"),
        };
      } else {
        param = {
          promotion_name: promotionModels.promotion_name,
          promotion_value: promotionModels.promotion_value,
          apply_date: promotionModels.apply_date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          expired_date: promotionModels.expired_date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };
      }

      const data = await promotionApi.updatePromotionService(param, id);
      console.log(data);
      dispatch({ type: UPDATE_PROMOTION_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
