import axios from "./axios";

const URL_ENTITY = "/v1/colour";

const colorApi = {
  getListColor: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
  getSearchListColor: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
  createNewColor: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  deleteColorService: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.delete(url);
  },

  getColorDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  updateColorService: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },
};

export default colorApi;
