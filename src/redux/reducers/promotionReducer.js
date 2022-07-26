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
  PROMOTION_LIST_DROPDOWN_REQUEST,
  PROMOTION_LIST_DROPDOWN_SUCCESS,
  PROMOTION_LIST_DROPDOWN_FAIL,
} from "../../service/Validations/VarConstant";

function resultArr(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ promotion_id, promotion_name, status }) => ({
    key: promotion_id.toString(),
    text: promotion_name,
    value: promotion_id,
    status: status.toString(),
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

export const listPromotionDropdownReducer = (
  state = { loading: true, promotion: [], error: "" },
  action
) => {
  switch (action.type) {
    case PROMOTION_LIST_DROPDOWN_REQUEST:
      return { ...state, loading: true };
    case PROMOTION_LIST_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        promotion: [...resultArr(action.payload)],
      };
    case PROMOTION_LIST_DROPDOWN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
