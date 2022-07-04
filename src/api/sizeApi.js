import axios from "./axios";

const URL_ENTITY = "/v1/sizes";

const sizeApi = {
  getListSize: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },
  getSearchListSize: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
  createNewSize: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  deleteSizeService: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.delete(url);
  },

  getSizeDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  updateSizeService: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },
};

export default sizeApi;
