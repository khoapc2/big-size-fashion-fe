import axios from "./axios";

const URL_ENTITY = "/v1/products";
// const URL_ADD_IMG = "/product-images/add-image";

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

  getProductDetailById: (params) => {
    const url = `${URL_ENTITY}/${params}`;
    return axios.get(url);
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
