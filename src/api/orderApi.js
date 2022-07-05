import axios from "./axios";

const URL_ENTITY = "/v1/orders";

const onlineOrderApi = {
  getListOnlineOrder: (params) => {
    const url = `${URL_ENTITY}/for-manager`;
    return axios.get(url, { params });
  },
  //   getSearchListColor: (params) => {
  //     const url = `${URL_ENTITY}`;
  //     return axios.get(url, { params });
  //   },
};

export default onlineOrderApi;
