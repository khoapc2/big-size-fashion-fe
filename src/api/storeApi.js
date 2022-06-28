import axios from "./axios";

const URL_ENTITY = "/v1/stores";

const storeApi = {
  getListStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },

  getSearchListStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
};

export default storeApi;
