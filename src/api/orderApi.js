import axios from "./axios";

const URL_ENTITY = "/v1/orders";

const onlineOrderApi = {
  getListOrder: (params) => {
    const url = `${URL_ENTITY}/for-manager`;
    return axios.get(url, { params });
  },

  getOrderDetailById: (params) => {
    const url = `${URL_ENTITY}/detail/${params}`;
    return axios.get(url);
  },
};

export default onlineOrderApi;
