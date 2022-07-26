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
  PROMOTION_LIST_DROPDOWN_REQUEST,
  PROMOTION_LIST_DROPDOWN_SUCCESS,
  PROMOTION_LIST_DROPDOWN_FAIL,
  PRODUCT_PROMOTION_LIST_REQUEST,
  PRODUCT_PROMOTION_LIST_FAIL,
  PRODUCT_PROMOTION_LIST_SUCCESS,
  DELETE_PRODUCT_FROM_PROMOTION_REQUEST,
  DELETE_PRODUCT_FROM_PROMOTION_FAIL,
  DELETE_PRODUCT_FROM_PROMOTION_SUCCESS,
  ADD_PRODUCT_TO_PROMOTION_REQUEST,
  ADD_PRODUCT_TO_PROMOTION_FAIL,
  ADD_PRODUCT_TO_PROMOTION_SUCCESS,
  LIST_PRODUCT_ADD_PROMOTION_REQUEST,
  LIST_PRODUCT_ADD_PROMOTION_FAIL,
  LIST_PRODUCT_ADD_PROMOTION_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listPromotion =
  ({ keySearch, status }) =>
  async (dispatch) => {
    try {
      if (!status) {
        dispatch({ type: PROMOTION_LIST_REQUEST });
        if (!keySearch) {
          const params = {
            OrderByExpiredDate: true,
          };
          const data = await promotionApi.getListPromotion(params);
          dispatch({ type: PROMOTION_LIST_SUCCESS, payload: data.content });
          dispatch({ type: PROMOTION_LIST_FAIL, payload: "" });
        } else {
          const searchParams = {
            PromotionName: keySearch,
            OrderByExpiredDate: true,
          };
          const data = await promotionApi.getSearchListPromotion(searchParams);
          dispatch({ type: PROMOTION_LIST_SUCCESS, payload: data.content });
          dispatch({ type: PROMOTION_LIST_FAIL, payload: "" });
        }
      } else {
        dispatch({ type: PROMOTION_LIST_DROPDOWN_REQUEST });
        const params = {
          Status: status,
          OrderByExpiredDate: true,
        };
        const data = await promotionApi.getListPromotion(params);
        console.log(data);
        dispatch({ type: PROMOTION_LIST_DROPDOWN_SUCCESS, payload: data.content });
        dispatch({ type: PROMOTION_LIST_DROPDOWN_FAIL, payload: "" });
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
      console.log(promotionModels);
      let param = {};
      let applyDate;
      let expiredDate;

      if (promotionModels.apply_date.toString().includes("/")) {
        applyDate = promotionModels.apply_date.split("/").reverse().join("/");
      } else {
        applyDate = promotionModels.apply_date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }

      if (promotionModels.expired_date.toString().includes("/")) {
        expiredDate = promotionModels.expired_date.split("/").reverse().join("/");
      } else {
        expiredDate = promotionModels.expired_date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }

      param = {
        promotion_name: promotionModels.promotion_name,
        promotion_value: promotionModels.promotion_value,
        apply_date: applyDate,
        expired_date: expiredDate,
      };
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

export const listProductOfPromotion = (keySearch, promotionId, page, size) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PROMOTION_LIST_REQUEST });
    if (!keySearch) {
      const params = {
        PromotionId: promotionId,
        PageNumber: page,
        PageSize: size,
      };
      const data = await promotionApi.getListProductOfPromotion(params);
      dispatch({ type: PRODUCT_PROMOTION_LIST_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_PROMOTION_LIST_FAIL, payload: "" });
    } else {
      const searchParams = {
        PromotionId: promotionId,
        ProductName: keySearch,
        PageNumber: page,
        PageSize: size,
      };
      const data = await promotionApi.getListProductOfPromotion(searchParams);
      dispatch({ type: PRODUCT_PROMOTION_LIST_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_PROMOTION_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: PRODUCT_PROMOTION_LIST_FAIL, payload: message });
  }
};

export const deleteProductFromPromotion = (promotionId, productId) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_FROM_PROMOTION_REQUEST,
  });
  try {
    const param = {
      product_id: productId,
      promotion_id: Number(promotionId),
    };
    const data = await promotionApi.deletePromotionProduct(param);
    dispatch({ type: DELETE_PRODUCT_FROM_PROMOTION_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_PRODUCT_FROM_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addProductToPromotion = (promotionId, para) => async (dispatch) => {
  console.log(para);
  const listProduct = Array.from(para.values());
  const listProductHandleParse = [];
  const listProductSendToBE = [];
  listProduct.forEach((product) => {
    const inforIdProduct = product.product_id;
    console.log(product);
    const parseProduct = {
      ...product,
      product_id: Number(inforIdProduct),
    };
    console.log(parseProduct);
    listProductHandleParse.push(parseProduct);
  });
  console.log(listProductHandleParse);
  listProductHandleParse.forEach((product) => {
    if (product) {
      const { product_id } = product;
      listProductSendToBE.push(product_id);
    }
  });
  console.log(listProductSendToBE);
  dispatch({
    type: ADD_PRODUCT_TO_PROMOTION_REQUEST,
  });
  try {
    const param = {
      promotion_id: promotionId,
      list_product_id: listProductSendToBE,
    };
    const data = await promotionApi.addPromotionProduct(param);
    console.log(data);
    dispatch({ type: ADD_PRODUCT_TO_PROMOTION_SUCCESS, payload: data.content });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_PRODUCT_TO_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const getProductToAddPromotion = () => async (dispatch) => {
  dispatch({
    type: LIST_PRODUCT_ADD_PROMOTION_REQUEST,
  });
  try {
    const data = await promotionApi.getListProductAddToPromotion();
    dispatch({ type: LIST_PRODUCT_ADD_PROMOTION_SUCCESS, payload: data.content });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LIST_PRODUCT_ADD_PROMOTION_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
