import axios from "./axios";

const URL_ENTITY = "/v1/delivery-notes";

const IMPORT_LIST = "/import-list";
const EXPORT_LIST = "/export-list";

const deliverApi = {
  getImportList: () => {
    const url = `${URL_ENTITY.concat(IMPORT_LIST)}`;
    console.log(url);
    return axios.get(url);
  },

  getExportList: () => {
    const url = `${URL_ENTITY.concat(EXPORT_LIST)}`;
    return axios.get(url);
  },
};
export default deliverApi;
