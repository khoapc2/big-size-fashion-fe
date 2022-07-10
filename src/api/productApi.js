import axios from "./axios";

const URL_ENTITY = "/v1/products";
// const URL_ADD_IMG = "/product-images/add-image";
const URL_CREATE_DETAIL = "https://20.211.17.194/api/v1/product-details";
const ADD_PROMOTION_PRODUCT = "https://20.211.17.194/api/v1/promotion-details";

const productApi = {
  getListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, params);
  },

  getSearchListProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.get(url, { params });
  },

  createNewProduct: (params) => {
    const url = `${URL_ENTITY}`;
    return axios.post(url, params);
  },

  createDetailProduct: (params) => {
    const url = `${URL_CREATE_DETAIL}`;
    return axios.post(url, params);
  },

  getProductDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
  },

  addPromotionProduct: (params) => {
    const url = `${ADD_PROMOTION_PRODUCT}`;
    return axios.post(url, params);
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
