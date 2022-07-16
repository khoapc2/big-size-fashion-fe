import axios from "./axios";

const URL_ENTITY = "/v1/store-warehouses";
const AJUSMENT_QUANTITY = "/quantity-adjustment";
const inventoryApi = {
  getInventoryInStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },
  quantityAdjustment: (params) => {
    const url = `${URL_ENTITY}${AJUSMENT_QUANTITY}`;
    return axios.put(url, params);
  },
};
export default inventoryApi;
