import axios from "./axios";

const URL_ENTITY = "/v1/sizes";

const sizeApi = {
  getListSize: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
};

export default sizeApi;
