import {
  SIZE_LIST_REQUEST,
  SIZE_LIST_SUCCESS,
  SIZE_LIST_FAIL,
  CREATE_SIZE_REQUEST,
  CREATE_SIZE_SUCCESS,
  CREATE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_SUCCESS,
  DELETE_SIZE_FAIL,
  VIEW_DETAIL_SIZE_REQUEST,
  VIEW_DETAIL_SIZE_SUCCESS,
  VIEW_DETAIL_SIZE_FAIL,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAIL,
  SIZE_LIST_DROPDOWN_REQUEST,
  SIZE_LIST_DROPDOWN_SUCCESS,
  SIZE_LIST_DROPDOWN_FAIL,
} from "../../service/Validations/VarConstant";

function resultArr(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ size_id, size_name, status }) => ({
    key: size_id.toString(),
    text: size_name,
    value: size_id,
    status,
  }));
  return result;
}

export const listSizeReducer = (state = { loading: true, size: [], error: "" }, action) => {
  switch (action.type) {
    case SIZE_LIST_REQUEST:
      return { ...state, loading: true };
    case SIZE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        size: action.payload,
      };
    case SIZE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailSizeReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case VIEW_DETAIL_SIZE_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_SIZE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_SIZE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SIZE_REQUEST:
      return { ...state, loading: true };
    case CREATE_SIZE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CREATE_SIZE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSizeReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_SIZE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SIZE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_SIZE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SIZE_REQUEST:
      return { ...state, loading: true };
    case DELETE_SIZE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case DELETE_SIZE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSizeDropdownReducer = (
  state = { loading: true, category: [], error: "" },
  action
) => {
  switch (action.type) {
    case SIZE_LIST_DROPDOWN_REQUEST:
      return { ...state, loading: true };
    case SIZE_LIST_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        size: [...resultArr(action.payload)],
      };
    case SIZE_LIST_DROPDOWN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
