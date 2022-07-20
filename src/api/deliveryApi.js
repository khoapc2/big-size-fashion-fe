import axios from "./axios";

const URL_ENTITY = "/v1/delivery-notes";

const IMPORT_LIST = "/import-list";
const EXPORT_LIST = "/export-list";
const ADMIN_EXPORT_LIST = "/export-list-for-main-warehouse";

const deliverApi = {
  getImportList: (param) => {
    const url = `${URL_ENTITY}${IMPORT_LIST}?PageNumber=${param.PageNumber}&PageSize=${param.PageSize}`;
    return axios.get(url);
  },
  getExportList: (param) => {
    const url = `${URL_ENTITY}${EXPORT_LIST}?PageNumber=${param.PageNumber}&PageSize=${param.PageSize}`;
    return axios.get(url);
  },

  adminGetExportList: () => {
    const url = `${URL_ENTITY}${ADMIN_EXPORT_LIST}`;
    return axios.get(url);
  },

  createDeliveryNote: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  getDeliveryNoteDetailById: (id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.get(url);
  },
};
export default deliverApi;
