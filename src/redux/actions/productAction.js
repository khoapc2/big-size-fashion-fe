import axios from "axios";
import productApi from "../../api/productApi";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  VIEW_DETAIL_PRODUCT_REQUEST,
  VIEW_DETAIL_PRODUCT_SUCCESS,
  VIEW_DETAIL_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  IMPORT_PRODUCT_LIST_REQUEST,
  IMPORT_PRODUCT_LIST_SUCCESS,
  IMPORT_PRODUCT_LIST_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../../service/Validations/VarConstant";

export const listProduct = (keySearch, page, size) => async (dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { role } = currentUser;
  console.log(page);
  let searchParams;
  if (role === "Admin") {
    searchParams = {
      ProductName: keySearch,
      PageNumber: page,
      PageSize: size,
    };
  } else if (role === "Manager") {
    searchParams = {
      ProductName: keySearch,
      Status: true,
      PageNumber: page,
      PageSize: size,
    };
  }

  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    if (!keySearch) {
      let param;
      if (role === "Manager") {
        param = {
          Status: true,
          PageNumber: page,
          PageSize: size,
        };
      } else {
        param = {
          PageNumber: page,
          PageSize: size,
        };
      }
      console.log(param);
      const data = await productApi.getListProduct(param);
      console.log(data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_LIST_FAIL, payload: "" });
    } else {
      const data = await productApi.getSearchListProduct(searchParams);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};

export const createProduct = (productModels, files) => async (dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { token } = currentUser;
  const axiosConfig = {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
      Accept: "application/json",
      type: "formData",
      authorization: `Bearer ${token}`,
    },
  };
  console.log(productModels);
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
    payload: { productModels },
  });
  try {
    if (productModels) {
      const param = {
        product_name: productModels.productName,
        price: productModels.price,
        category_id: productModels.category,
        description: productModels.description,
        gender: productModels.sex,
        brand: productModels.brandName,
      };
      const data = await productApi.createNewProduct(param);

      await axios
        .post(
          `https://20.211.17.194/api/product-images/add-image/${data.content.product_id}`,
          files,
          axiosConfig
        )
        .then((res) => console.log(res));

      let productDetail = {};
      let dataDetail;
      productModels.colourWithSize.map(async (item) => {
        productDetail = {
          product_id: data.content.product_id,
          colour_id: item.colour,
          size_id_list: item.size,
        };
        dataDetail = await productApi.createDetailProduct(productDetail);
        return dataDetail;
      });

      // if (productModels.promotion) {
      //   const paramPromotion = {
      //     promotion_id: productModels.promotion,
      //     list_product_id: [data.content.product_id],
      //   };
      //   await productApi.addPromotionProduct(paramPromotion);
      // }
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetailProduct = (productId, role) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_PRODUCT_REQUEST,
    payload: { productId },
  });
  try {
    const data = await productApi.getProductDetailById(productId);
    if (role !== "Owner") {
      await data.content.product_detail_list.map(async (item) => {
        const params = {
          ProductId: data.content.product_id,
          ColourId: item.colour.colour_id,
          SizeId: item.size.size_id,
        };
        const dataQuantity = await productApi.getQuantityProduct(params);
        item.quantity = await dataQuantity.content.quantity;
      });
    }
    dispatch({ type: VIEW_DETAIL_PRODUCT_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProduct = (productModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_REQUEST,
    payload: { productModels },
  });
  try {
    if (productModels) {
      const param = {
        product_name: productModels.productName,
        price: productModels.price,
        category_id: productModels.category,
        description: productModels.description,
        gender: productModels.sex,
        brand: productModels.brandName,
      };
      const data = await productApi.updateProduct(param, id);
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  // console.log("DeleteStore");
  // console.log(storeId);
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
    payload: { productId },
  });
  try {
    const data = await productApi.deleteProduct(productId);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getProductToImportAction = () => async (dispatch) => {
  dispatch({
    type: IMPORT_PRODUCT_LIST_REQUEST,
  });
  try {
    const data = await productApi.getProductToImport();
    console.log(data);
    dispatch({ type: IMPORT_PRODUCT_LIST_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: IMPORT_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
