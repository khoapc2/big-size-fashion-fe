import axios from "./axios";

const URL_ENTITY = "/v1/orders";

const OFFLINE_URL = "offline-approve/";
const REJECT_URL = "reject/";

const orderApi = {
  getListOrder: (params) => {
    const url = `${URL_ENTITY}/for-manager`;
    return axios.get(url, { params });
  },

  getOrderDetailById: (params) => {
    const url = `${URL_ENTITY}/detail/${params}`;
    return axios.get(url);
  },

  approveOfflineOrder: (params) => {
    const url = `${URL_ENTITY}/${OFFLINE_URL}${params}`;
    return axios.put(url);
  },

  rejectOrder: (params) => {
    const url = `${URL_ENTITY}/${REJECT_URL}${params}`;
    return axios.put(url);
  },
};
export default orderApi;
