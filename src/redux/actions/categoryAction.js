import categoryApi from "../../api/categoryApi";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_ALL_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  VIEW_DETAIL_CATEGORY_REQUEST,
  VIEW_DETAIL_CATEGORY_SUCCESS,
  VIEW_DETAIL_CATEGORY_FAIL,
} from "../../service/Validations/VarConstant";

export const listCategory =
  ({ keySearch = "", status }) =>
  async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    try {
      if (!status) {
        if (!keySearch) {
          const data = await categoryApi.getListCategory();
          dispatch({ type: CATEGORY_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
        } else {
          console.log("??");
          const searchParams = {
            Category: keySearch,
          };
          const data = await categoryApi.getSearchListCategory(searchParams);
          dispatch({ type: CATEGORY_LIST_ALL_SUCCESS, payload: data.content });
          dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
        }
      } else {
        const params = {
          Status: status,
        };
        const data = await categoryApi.getListCategory(params);
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.content });
        dispatch({ type: CATEGORY_LIST_FAIL, payload: "" });
      }
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: CATEGORY_LIST_FAIL, payload: message });
    }
  };

export const createCategory = (categoryModels) => async (dispatch) => {
  dispatch({
    type: CREATE_CATEGORY_REQUEST,
    payload: { categoryModels },
  });
  try {
    if (categoryModels) {
      const param = {
        category: categoryModels.category,
      };
      const data = await categoryApi.createNewCategory(param);
      console.log(`data create category in action: ${data.content}`);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data.content });
    }
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateCategory = (categoryModels, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_CATEGORY_REQUEST,
    payload: { categoryModels },
  });
  try {
    if (categoryModels) {
      const param = {
        category: categoryModels.category,
      };
      const data = await categoryApi.updateCategoryService(param, id);
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const viewDetail = (categoryId) => async (dispatch) => {
  dispatch({
    type: VIEW_DETAIL_CATEGORY_REQUEST,
    payload: { categoryId },
  });
  try {
    const data = await categoryApi.getCategoryDetailById(categoryId);
    dispatch({ type: VIEW_DETAIL_CATEGORY_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: VIEW_DETAIL_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
