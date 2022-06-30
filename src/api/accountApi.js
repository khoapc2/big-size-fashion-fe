import axios from "./axios";

const URL_ENTITY = "/v1/accounts/get-list-accounts";

const accountApi = {
  getListAccount: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  getSearchListAccount: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
};

export default accountApi;
