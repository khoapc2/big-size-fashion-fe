import axios from "./axios";

const URL_ENTITY = "/v1/accounts/get-list-accounts";

const URL_DISABLE_ACCOUNT = "/v1/accounts/disable-account/uid";

const URL_DETAIL_ACCOUNT = "/v1/accounts/get-detail-by-uid";

const URL_CREATE_ACCOUNT = "/v1/accounts/create-staff-account";

const accountApi = {
  getListAccount: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  getSearchListAccount: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  deleteAccountService: (params) => {
    const url = `${URL_DISABLE_ACCOUNT}`;
    return axios.delete(url, { params });
  },

  createNewAccount: (params) => {
    const url = `${URL_CREATE_ACCOUNT}`;
    return axios.post(url, params);
  },

  getAccountDetailById: (params) => {
    const url = `${URL_DETAIL_ACCOUNT}/${params}`;
    return axios.get(url);
  },
};

export default accountApi;
