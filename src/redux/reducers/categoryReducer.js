import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_ALL_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
} from "../../service/Validations/VarConstant";

function resultArr(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ category_id, category_name, status }) => ({
    key: category_id.toString(),
    text: category_name,
    value: category_id.toString(),
    status,
  }));
  return result;
}

export const listCategoryReducer = (state = { loading: true, category: [], error: "" }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        category: [...resultArr(action.payload)],
      };
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
  console.log(state, action);
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
