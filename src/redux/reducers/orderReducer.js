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
  APPROVE_ONLINE_ORDER_REQUEST,
  APPROVE_ONLINE_ORDER_SUCCESS,
  APPROVE_ONLINE_ORDER_FAIL,
  CANCEL_ONLINE_ORDER_REQUEST,
  CANCEL_ONLINE_ORDER_SUCCESS,
  CANCEL_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_REQUEST,
  REJECT_ONLINE_ORDER_FAIL,
  REJECT_ONLINE_ORDER_SUCCESS,
  STATISTIC_TODAY_ORDER_REQUEST,
  STATISTIC_TODAY_ORDER_SUCCESS,
  STATISTIC_TODAY_ORDER_FAIL,
  STAFF_PERFORM_ORDER_REQUEST,
  STAFF_PERFORM_ORDER_SUCCESS,
  STAFF_PERFORM_ORDER_FAIL,
  CHANGE_PAYMENT_METHOD_REQUEST,
  CHANGE_PAYMENT_METHOD_SUCCESS,
  CHANGE_PAYMENT_METHOD_FAIL,
} from "../../service/Validations/VarConstant";

const calculateTotalPrice = ({ product_list }) => {
  let totalPrice = 0;
  product_list.forEach(({ price, discount_price }) => {
    if (discount_price) {
      totalPrice += discount_price;
    } else {
      totalPrice += price;
    }
  });
  return {
    product_detail_id: 1.1,
    total_quantity_price: totalPrice,
    category: "",
    colour: "",
    quantity: "",
    discount_price: "",
    discount_price_per_one: "",
    price: "",
    price_per_one: "",
    product_id: "",
    product_image_url: "",
    product_name: "",
    size: "",
  };
};

export const listOnlineOrderReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case ONLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ONLINE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case ONLINE_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listOfflineOrderReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case OFFLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case OFFLINE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case OFFLINE_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderTodayReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case STATISTIC_TODAY_ORDER_REQUEST:
      return { ...state, loading: true };
    case STATISTIC_TODAY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STATISTIC_TODAY_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const staffPerformanceOrderReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case STAFF_PERFORM_ORDER_REQUEST:
      return { ...state, loading: true };
    case STAFF_PERFORM_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case STAFF_PERFORM_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changePaymentMethodReducer = (
  state = { loading: true, success: {}, error: "" },
  action
) => {
  switch (action.type) {
    case CHANGE_PAYMENT_METHOD_REQUEST:
      return { ...state, loading: true };
    case CHANGE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case CHANGE_PAYMENT_METHOD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailOfflineOrderReducer = (
  state = { loading: true, data: [], error: "", totalProduct: [] },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_OFFLINE_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_OFFLINE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        totalProduct: [...action.payload.product_list, calculateTotalPrice(action.payload)],
      };
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

export const approveOnlineOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case APPROVE_ONLINE_ORDER_REQUEST:
      return { ...state, loading: true };
    case APPROVE_ONLINE_ORDER_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case APPROVE_ONLINE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rejectOnlineOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REJECT_ONLINE_ORDER_REQUEST:
      return { ...state, loading: true };
    case REJECT_ONLINE_ORDER_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case REJECT_ONLINE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelOnlineOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CANCEL_ONLINE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CANCEL_ONLINE_ORDER_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CANCEL_ONLINE_ORDER_FAIL:
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
