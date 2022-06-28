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
};

export default promotionApi;
