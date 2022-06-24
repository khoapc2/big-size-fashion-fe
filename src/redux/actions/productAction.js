import productApi from "../../api/productApi";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listProduct = (keySearch, page) => async (dispatch) => {
  const params = {
    ProductName: keySearch,
    PageNumber: page,
  };
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await productApi.getListProduct(page);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.content });
      dispatch({ type: PRODUCT_LIST_FAIL, payload: "" });
    } else {
      const data = await productApi.getSearchListProduct(params);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.content });
      dispatch({ type: PRODUCT_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};
export const a = (keySearch, page) => async (dispatch) => {
  // console.log(keySearch, page);
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    if (keySearch) {
      const data = await productApi.getListProduct(page);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_LIST_FAIL, payload: "" });
    } else {
      const { data } = await productApi.getListProduct({ page, keySearch });
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    const message = error.response.data;
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};
