import {
  PROMOTION_LIST_REQUEST,
  PROMOTION_LIST_SUCCESS,
  PROMOTION_LIST_FAIL,
  CREATE_PROMOTION_REQUEST,
  CREATE_PROMOTION_SUCCESS,
  CREATE_PROMOTION_FAIL,
  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAIL,
  VIEW_DETAIL_PROMOTION_REQUEST,
  VIEW_DETAIL_PROMOTION_SUCCESS,
  VIEW_DETAIL_PROMOTION_FAIL,
  UPDATE_PROMOTION_REQUEST,
  UPDATE_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_FAIL,
  PRODUCT_PROMOTION_LIST_REQUEST,
  PRODUCT_PROMOTION_LIST_FAIL,
  PRODUCT_PROMOTION_LIST_SUCCESS,
  DELETE_PRODUCT_FROM_PROMOTION_REQUEST,
  DELETE_PRODUCT_FROM_PROMOTION_FAIL,
  DELETE_PRODUCT_FROM_PROMOTION_SUCCESS,
  ADD_PRODUCT_TO_PROMOTION_REQUEST,
  ADD_PRODUCT_TO_PROMOTION_FAIL,
  ADD_PRODUCT_TO_PROMOTION_SUCCESS,
  LIST_PRODUCT_ADD_PROMOTION_REQUEST,
  LIST_PRODUCT_ADD_PROMOTION_FAIL,
  LIST_PRODUCT_ADD_PROMOTION_SUCCESS,
} from "../../service/Validations/VarConstant";

function formatArray(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ product_id, product_name }) => ({
    key: `${product_id}`,
    text: `${product_name}`,
    value: `${product_id}`,
  }));
  result.push({ key: "0.1", text: "*Không", value: 0, status: "true" });
  return result;
}

export const listPromotionReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case PROMOTION_LIST_REQUEST:
      return { ...state, loading: true };
    case PROMOTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case PROMOTION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPromotionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case CREATE_PROMOTION_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePromotionReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROMOTION_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePromotionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case DELETE_PROMOTION_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailPromotionReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_PROMOTION_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listProductOfPromotionReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_PROMOTION_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_PROMOTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case PRODUCT_PROMOTION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductFromPromotionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_FROM_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_FROM_PROMOTION_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_PRODUCT_FROM_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addProductToPromotionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case ADD_PRODUCT_TO_PROMOTION_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case ADD_PRODUCT_TO_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listProductsToAddPromotionReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case LIST_PRODUCT_ADD_PROMOTION_REQUEST:
      return { ...state, loading: true };
    case LIST_PRODUCT_ADD_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: formatArray(action.payload),
      };
    case LIST_PRODUCT_ADD_PROMOTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
