import axios from "./axios";

const URL_ENTITY = "/v1/accounts/get-list-accounts";

const URL_DISABLE_ACCOUNT = "/v1/accounts/disable-account/uid";

const URL_DETAIL_ACCOUNT = "/v1/accounts/get-detail-by-uid";

const URL_CREATE_ACCOUNT = "/v1/accounts/create-staff-account";

const URL_LIST_STAFF_IN_STORE = "/v1/staffs/all-staff-of-store";

const URL_RESET_PASSWORD = "/v1/accounts/reset-password";

const GET_LIST_MANAGER_OWNER = "/v1/staffs/list-manager";

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

  getListStaffInStore: () => {
    const url = URL_LIST_STAFF_IN_STORE;
    return axios.get(url);
  },

  resetPasswordEmployee: (params, id) => {
    const url = `${URL_RESET_PASSWORD}/${id}`;
    return axios.put(url, params);
  },
  getManagerForOwner: (params) => {
    const url = `${GET_LIST_MANAGER_OWNER}`;
    return axios.get(url, { params });
  },
};

export default accountApi;
