import axios from "./axios";

const URL_ENTITY = "/v1/products";

const productApi = {
  getListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },
};

export default productApi;
