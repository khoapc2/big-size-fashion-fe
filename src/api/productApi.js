import axios from "./axios";

const URL_ENTITY = "/v1/products";
// const URL_ADD_IMG = "/product-images/add-image";
const IMPORT_PRODUCT = "/all-product-to-import";
const URL_CREATE_DETAIL = "/v1/product-details";

const GET_QUANTITY_PRODUCT = "/v1/products/quantity-of-store";

const productApi = {
  getListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  getSearchListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  createNewProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  updateProduct: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.put(url, params);
  },

  deleteProduct: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.delete(url);
  },

  createDetailProduct: (params) => {
    const url = `${URL_CREATE_DETAIL}`;
    return axios.post(url, params);
  },

  getProductDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  getProductToImport: () => {
    const url = `${URL_ENTITY.concat(IMPORT_PRODUCT)}`;
    return axios.get(url);
  },

  getQuantityProduct: (params) => {
    const url = `${GET_QUANTITY_PRODUCT}`;
    return axios.get(url, { params });
  },

  // addImgToProduct: (id, params) => {
  //   console.log(id);
  //   console.log(params);
  //   const url = `${URL_ADD_IMG}/${id}`;
  //   return axios.post(url, params, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       testing: "test1",
  //     },
  //   });
  // },
};

export default productApi;
