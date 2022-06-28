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
};

export default colorApi;
