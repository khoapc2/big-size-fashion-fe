import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_FAIL,
  COLOR_LIST_ALL_SUCCESS,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_SUCCESS,
  CREATE_COLOR_FAIL,
  DELETE_COLOR_REQUEST,
  DELETE_COLOR_SUCCESS,
  DELETE_COLOR_FAIL,
  VIEW_DETAIL_COLOR_REQUEST,
  VIEW_DETAIL_COLOR_SUCCESS,
  VIEW_DETAIL_COLOR_FAIL,
  UPDATE_COLOR_REQUEST,
  UPDATE_COLOR_SUCCESS,
  UPDATE_COLOR_FAIL,
  COLOR_LIST_DROPDOWN_SUCCESS,
  COLOR_LIST_DROPDOWN_FAIL,
  COLOR_LIST_DROPDOWN_REQUEST,
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

export const createColorReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COLOR_REQUEST:
      return { ...state, loading: true };
    case CREATE_COLOR_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_COLOR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateColorReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_COLOR_REQUEST:
      return { ...state, loading: true };
    case UPDATE_COLOR_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_COLOR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteColorReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COLOR_REQUEST:
      return { ...state, loading: true };
    case DELETE_COLOR_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_COLOR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailColorReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case VIEW_DETAIL_COLOR_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_COLOR_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_COLOR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listColorDropdownReducer = (
  state = { loading: true, colour: [], error: "" },
  action
) => {
  switch (action.type) {
    case COLOR_LIST_DROPDOWN_REQUEST:
      return { ...state, loading: true };
    case COLOR_LIST_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        colour: [...formatArray(action.payload)],
      };
    case COLOR_LIST_DROPDOWN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
