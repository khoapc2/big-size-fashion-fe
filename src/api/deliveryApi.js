import axios from "./axios";

const URL_ENTITY = "/v1/delivery-notes";

const IMPORT_LIST = "/import-list";
const EXPORT_LIST = "/export-list";
const ADMIN_EXPORT_LIST = "/export-list-for-main-warehouse";
const APPROVE = "approve/";
const REJECT = "reject/";

const deliverApi = {
  getImportList: (param) => {
    const url = `${URL_ENTITY}${IMPORT_LIST}?PageNumber=${param.PageNumber}&PageSize=${param.PageSize}`;
    return axios.get(url);
  },
  getExportList: (param) => {
    const url = `${URL_ENTITY}${EXPORT_LIST}?PageNumber=${param.PageNumber}&PageSize=${param.PageSize}`;
    return axios.get(url);
  },

  adminGetExportList: (param) => {
    const url = `${URL_ENTITY}${ADMIN_EXPORT_LIST}`;
    return axios.get(url, { param });
  },

  createDeliveryNote: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  getDeliveryNoteDetailById: (id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.get(url);
  },

  approveDelivery: (params) => {
    const url = `${URL_ENTITY}/${APPROVE}${params}`;
    return axios.put(url);
  },

  rejectDelivery: (params) => {
    const url = `${URL_ENTITY}/${REJECT}${params}`;
    return axios.put(url);
  },

  cancelDelivery: (id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.delete(url);
  },
};
export default deliverApi;
