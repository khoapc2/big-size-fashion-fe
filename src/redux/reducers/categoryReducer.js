import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
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
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
