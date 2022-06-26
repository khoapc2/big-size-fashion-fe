import axios from "./axios";

const URL_ENTITY = "/v1/categories";

const categoryApi = {
  getListCategory: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },
};

export default categoryApi;
