/* eslint-disable */
import axios from "./axios";

const URL_ENTITY = "/v1/promotions";

const promotionApi = {
  getListPromotion: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
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
};

export default promotionApi;
