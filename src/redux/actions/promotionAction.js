import promotionApi from "../../api/promotionApi";
import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listPromotion = (keySearch, page) => async (dispatch) => {
  console.log("promotionAction");
  const params = {
    PromotionName: keySearch,
  };
  dispatch({ type: PROMOTION_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await promotionApi.getListPromotion(page);
      console.log(data);
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
