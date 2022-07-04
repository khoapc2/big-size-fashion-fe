import productApi from "../../api/productApi";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
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

export const createProduct = (productModels) => async (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
    payload: { productModels },
  });
  try {
    if (productModels) {
      const param = {
        product_name: productModels.productName,
        price: productModels.price,
        category_id: productModels.category,
        description: productModels.description,
        gender: productModels.sex,
        brand: productModels.brandName,
      };
      const data = await productApi.createNewProduct(param);
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
