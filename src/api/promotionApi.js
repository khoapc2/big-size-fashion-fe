/* eslint-disable */
import axios from "./axios";

const URL_ENTITY = "/v1/promotions";
const ADD_PROMOTION_PRODUCT = "/v1/promotion-details";
const REMOVE_PROMOTION_PRODUCT = "/v1/promotion-details";
const LIST_PRODUCT = "/v1/products/all-product-to-add-into-promotion";

const promotionApi = {
  getListPromotion: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  getSearchListPromotion: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  createNewPromotion: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  deletePromotionService: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.delete(url);
  },

  getPromotionDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  updatePromotionService: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },

  getListProductOfPromotion: (params) => {
    const url = `${ADD_PROMOTION_PRODUCT}`;
    return axios.get(url, { params });
  },

  addPromotionProduct: (params) => {
    const url = `${ADD_PROMOTION_PRODUCT}`;
    return axios.post(url, params);
  },

  deletePromotionProduct: (params) => {
    console.log(params);
    const url = `${REMOVE_PROMOTION_PRODUCT}`;
    return axios.delete(url, {
      data: { product_id: params.product_id, promotion_id: params.promotion_id },
    });
  },

  getListProductAddToPromotion: () => {
    const url = `${LIST_PRODUCT}`;
    return axios.get(url);
  },

};

export default promotionApi;
