import axios from "./axios";

const URL_ENTITY = "/v1/stores";

const CHECK_AVAILABLE_STORE = "/v1/stores/available-store";

const storeApi = {
  getListStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  getSearchListStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  createNewStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  deleteStoreService: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.delete(url);
  },

  getStoreDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  updateStoreService: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },

  checkAvailableStore: (params) => {
    const url = `${CHECK_AVAILABLE_STORE}`;
    return axios.post(url, params);
  },
};

export default storeApi;
