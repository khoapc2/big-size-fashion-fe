import {
  IMPORT_DELIVER_LIST_REQUEST,
  IMPORT_DELIVER_LIST_SUCCESS,
  IMPORT_DELIVER_LIST_FAIL,
  EXPORT_DELIVER_LIST_REQUEST,
  EXPORT_DELIVER_LIST_SUCCESS,
  EXPORT_DELIVER_LIST_FAIL,
  CREATE_IMPORT_PRODUCT_LIST_REQUEST,
  CREATE_IMPORT_PRODUCT_LIST_SUCCESS,
  CREATE_IMPORT_PRODUCT_LIST_FAIL,
  VIEW_DETAIL_DELIVERY_NOTE_REQUEST,
  VIEW_DETAIL_DELIVERY_NOTE_FAIL,
  VIEW_DETAIL_DELIVERY_NOTE_SUCCESS,
  APPROVE_DELIVERY_NOTE_REQUEST,
  APPROVE_DELIVERY_NOTE_SUCCESS,
  APPROVE_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_REQUEST,
  REJECT_DELIVERY_NOTE_FAIL,
  REJECT_DELIVERY_NOTE_SUCCESS,
  CANCEL_DELIVERY_NOTE_REQUEST,
  CANCEL_DELIVERY_NOTE_SUCCESS,
  CANCEL_DELIVERY_NOTE_FAIL,
  DELIVERY_CART,
  DELIVERY_CART_ACTION_SUCCESS,
  DELIVERY_CART_ACTION_FAIL,
  REMOVE_DELIVERY_CART,
} from "../../service/Validations/VarConstant";

const calculateTotalPrice = ({ total_price }) => {
  const totalPrice = total_price;
  return {
    product_detail_id: 1.5,
    total_quantity_price: totalPrice,
    category: "",
    colour: "",
    quantity: "",
    price: "",
    price_per_one: "",
    product_id: "",
    image_url: "",
    product_name: "",
    size: "",
  };
};

export const listImportDeliverReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case IMPORT_DELIVER_LIST_REQUEST:
      return { ...state, loading: true };
    case IMPORT_DELIVER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case IMPORT_DELIVER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listExportDeliverReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case EXPORT_DELIVER_LIST_REQUEST:
      return { ...state, loading: true };
    case EXPORT_DELIVER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case EXPORT_DELIVER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createImportDeliverReducer = (
  state = { loading: true, data: [], error: "" },
  action
) => {
  switch (action.type) {
    case CREATE_IMPORT_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case CREATE_IMPORT_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case CREATE_IMPORT_PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewDetailDeliveryNoteReducer = (
  state = { loading: true, data: [], error: "", totalProduct: [] },
  action
) => {
  switch (action.type) {
    case VIEW_DETAIL_DELIVERY_NOTE_REQUEST:
      return { ...state, loading: true };
    case VIEW_DETAIL_DELIVERY_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        totalProduct: [...action.payload.product_list, calculateTotalPrice(action.payload)],
      };
    case VIEW_DETAIL_DELIVERY_NOTE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const approveDeliveryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case APPROVE_DELIVERY_NOTE_REQUEST:
      return { ...state, loading: true };
    case APPROVE_DELIVERY_NOTE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case APPROVE_DELIVERY_NOTE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rejectDeliveryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REJECT_DELIVERY_NOTE_REQUEST:
      return { ...state, loading: true };
    case REJECT_DELIVERY_NOTE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case REJECT_DELIVERY_NOTE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelDeliveryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CANCEL_DELIVERY_NOTE_REQUEST:
      return { ...state, loading: true };
    case CANCEL_DELIVERY_NOTE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case CANCEL_DELIVERY_NOTE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deliveryCartReducer = (
  state = { deliveryNote: [], actionSuccess: "", actionFail: "" },
  action
) => {
  switch (action.type) {
    case DELIVERY_CART:
      return { ...state, deliveryNote: action.payload };
    case DELIVERY_CART_ACTION_SUCCESS:
      return { ...state, actionSuccess: action.payload };
    case DELIVERY_CART_ACTION_FAIL:
      return { ...state, actionFail: action.payload };
    case REMOVE_DELIVERY_CART:
      return { ...state, deliveryNote: [] };
    default:
      return state;
  }
};
// export const listOfflineOrderReducer = (state = { loading: true, data: [], error: "" }, action) => {
//   switch (action.type) {
//     case DELIVERY_NOTE_LIST_REQUEST:
//       return { ...state, loading: true };
//     case DELIVERY_NOTE_LIST_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//       };
//     case DELIVERY_NOTE_LIST_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const viewDetailOfflineOrderReducer = (
//   state = { loading: true, data: [], error: "" },
//   action
// ) => {
//   switch (action.type) {
//     case VIEW_DETAIL_DELIVERY_NOTE_LIST_REQUEST:
//       return { ...state, loading: true };
//     case VIEW_DETAIL_DELIVERY_NOTE_LIST_SUCCESS:
//       return { ...state, loading: false, data: action.payload };
//     case VIEW_DETAIL_DELIVERY_NOTE_LIST_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const approveOfflineOrderReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case APPROVE_DELIVERY_NOTE_REQUEST:
//       return { ...state, loading: true };
//     case APPROVE_DELIVERY_NOTE_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case APPROVE_DELIVERY_NOTE_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const rejectOfflineOrderReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case REJECT_DELIVERY_NOTE_REQUEST:
//       return { ...state, loading: true };
//     case REJECT_DELIVERY_NOTE_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case REJECT_DELIVERY_NOTE_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const approveOnlineOrderReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case APPROVE_ONLINE_ORDER_REQUEST:
//       return { ...state, loading: true };
//     case APPROVE_ONLINE_ORDER_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case APPROVE_ONLINE_ORDER_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const rejectOnlineOrderReducer = (state = { loading: true }, action) => {
//   switch (action.type) {
//     case REJECT_ONLINE_ORDER_REQUEST:
//       return { ...state, loading: true };
//     case REJECT_ONLINE_ORDER_SUCCESS:
//       return { ...state, loading: false, success: action.payload };
//     case REJECT_ONLINE_ORDER_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
