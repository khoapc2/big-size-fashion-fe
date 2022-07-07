import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAIL,
  GET_LIST_STAFF_IN_STORE_REQUEST,
  GET_LIST_STAFF_IN_STORE_SUCCESS,
  GET_LIST_STAFF_IN_STORE_FAIL,
} from "../../service/Validations/VarConstant";

function resultArr(payload) {
  let result = [];
  const newArray = [...payload];
  result = newArray.map(({ uid, fullname }) => ({
    key: uid.toString(),
    text: fullname,
    value: uid,
  }));
  return result;
}

export const listStaffReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { ...state, loading: true };
    case STAFF_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STAFF_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listStaffInStoreReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case GET_LIST_STAFF_IN_STORE_REQUEST:
      return { ...state, loading: true };
    case GET_LIST_STAFF_IN_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: resultArr(action.payload),
      };
    case GET_LIST_STAFF_IN_STORE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
