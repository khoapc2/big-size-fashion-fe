import axios from "./axios";

const URL_ENTITY = "/v1/categories";

const categoryApi = {
  getListCategory: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
  getSearchListCategory: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },
  createNewCategory: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },
  updateCategoryService: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },
  getCategoryDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },
};

export default categoryApi;
