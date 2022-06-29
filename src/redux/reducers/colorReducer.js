import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  COLOR_LIST_FAIL,
  COLOR_LIST_ALL_SUCCESS,
} from "../../service/Validations/VarConstant";

function formatArray(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ colour_id, colour_name }) => ({
    key: colour_id.toString(),
    text: colour_name,
    value: colour_id.toString(),
  }));
  return result;
}

export const listColorReducer = (state = { loading: true, colour: [], error: "" }, action) => {
  switch (action.type) {
    case COLOR_LIST_REQUEST:
      return { ...state, loading: true };
    case COLOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        colour: [...formatArray(action.payload)],
      };
    case COLOR_LIST_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        colour: action.payload,
      };
    case COLOR_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
