import {
  CATEGORY_LIST_REQUEST,
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
  CATEGORY_LIST_DROPDOWN_REQUEST,
  CATEGORY_LIST_DROPDOWN_SUCCESS,
  CATEGORY_LIST_DROPDOWN_FAIL,
} from "../../service/Validations/VarConstant";

function resultArr(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ category_id, category_name, status }) => ({
    key: category_id.toString(),
    text: category_name,
    value: category_id,
    status: status.toString(),
  }));
  return result;
}

export const listCategoryReducer = (state = { loading: true, category: [], error: "" }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailCategoryReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_CATEGORY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listCategoryDropdownReducer = (
  state = { loading: true, category: [], error: "" },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_DROPDOWN_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        category: [...resultArr(action.payload)],
      };
    case CATEGORY_LIST_DROPDOWN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
