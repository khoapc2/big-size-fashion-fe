import axios from "./axios";

const URL_ENTITY = "/v1/orders/revenue";

const revenueApi = {
  getRevenueManager: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
};

export default revenueApi;
