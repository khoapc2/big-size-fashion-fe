import axios from "./axios";

const URL_ENTITY = "/v1/store-warehouses";
const URL_ENTITY_INVENTORY = "/v1/inventory-notes";
const AJUSMENT_QUANTITY = "/quantity-adjustment";
// const LIST_ADJUSTMENT = "/api/v1/inventory-notes";
const inventoryApi = {
  getInventoryInStore: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },
  quantityAdjustment: (params) => {
    const url = `${URL_ENTITY}${AJUSMENT_QUANTITY}`;
    return axios.put(url, params);
  },
  getAdjustListInStore: (params) => {
    const url = `${URL_ENTITY_INVENTORY}`;
    return axios.get(url, { params });
  },
  getDetailAdjustListInStore: (param) => {
    const url = `${URL_ENTITY_INVENTORY}/${param}`;
    return axios.get(url);
  },
  createInventoryNote: (param) => {
    const url = `${URL_ENTITY_INVENTORY}`;
    return axios.post(url, param);
  },
  deleteInventoryNote: (id) => {
    const url = `${URL_ENTITY_INVENTORY}/${id}`;
    return axios.delete(url);
  },
};
export default inventoryApi;
