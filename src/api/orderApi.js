import axios from "./axios";

const URL_ENTITY = "/v1/orders";

const OFFLINE_URL = "offline-approve/";
const ONLINE_URL = "online-approve/";
const ASSIGN_ORDER = "assign-order";
const REJECT_URL = "reject/";
const EXPORT_ORDER = "export-bill/";
const CANCEL_URL = "cancel/";
const ORDER_TODAY = "/statistic-today";

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

  approveOnlineOrder: (params) => {
    const url = `${URL_ENTITY}/${ONLINE_URL}${params}`;
    return axios.put(url);
  },

  cancelOnlineOrder: (params) => {
    const url = `${URL_ENTITY}/${CANCEL_URL}${params}`;
    return axios.put(url);
  },

  assignOnlineOrderToStaff: (params) => {
    console.log(params);
    const url = `${URL_ENTITY}/${ASSIGN_ORDER}`;
    return axios.put(url, params);
  },

  exportOrderToExcel: (params) => {
    const url = `${URL_ENTITY}/${EXPORT_ORDER}${params}`;
    return axios.get(url, { responseType: "blob" });
  },

  orderToday: () => {
    const url = `${URL_ENTITY}${ORDER_TODAY}`;
    return axios.get(url);
  },
};
export default orderApi;
