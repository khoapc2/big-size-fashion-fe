import axios from "./axios";

const URL_ENTITY = "/v1/sizes";

const sizeApi = {
  getListSize: () => {
    const url = `${URL_ENTITY}`;
    return axios.get(url);
  },
};

export default sizeApi;
