import {
  ONLINE_ORDER_LIST_REQUEST,
  ONLINE_ORDER_LIST_SUCCESS,
  ONLINE_ORDER_LIST_FAIL,
  OFFLINE_ORDER_LIST_REQUEST,
  OFFLINE_ORDER_LIST_SUCCESS,
  OFFLINE_ORDER_LIST_FAIL,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS,
  VIEW_DETAIL_OFFLINE_ORDER_LIST_FAIL,
  APPROVE_OFFLINE_ORDER_REQUEST,
  APPROVE_OFFLINE_ORDER_SUCCESS,
  APPROVE_OFFLINE_ORDER_FAIL,
  CANCEL_OFFLINE_ORDER_REQUEST,
  CANCEL_OFFLINE_ORDER_SUCCESS,
  CANCEL_OFFLINE_ORDER_FAIL,
} from "../../service/Validations/VarConstant";

export const listOnlineOrderReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case ONLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ONLINE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ONLINE_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listOfflineOrderReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case OFFLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case OFFLINE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case OFFLINE_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailOfflineOrderReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_DETAIL_OFFLINE_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const approveOfflineOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case APPROVE_OFFLINE_ORDER_REQUEST:
      return { ...state, loading: true };
    case APPROVE_OFFLINE_ORDER_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case APPROVE_OFFLINE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rejectOfflineOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CANCEL_OFFLINE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CANCEL_OFFLINE_ORDER_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CANCEL_OFFLINE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const createStoreReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_STORE_REQUEST:
//       return { ...state, loading: true };
//     case CREATE_STORE_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case CREATE_STORE_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const deleteStoreReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_STORE_REQUEST:
//       return { ...state, loading: true };
//     case DELETE_STORE_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case DELETE_STORE_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
