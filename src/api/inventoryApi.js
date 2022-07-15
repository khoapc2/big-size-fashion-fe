import axios from "./axios";

const URL_ENTITY = "/v1/store-warehouses";

const inventoryApi = {
  getInventoryInStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },
};
export default inventoryApi;
