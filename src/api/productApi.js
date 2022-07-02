import axios from "./axios";

const URL_ENTITY = "/v1/products";

const productApi = {
  getListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },

  getSearchListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  createNewProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },
};

export default productApi;
