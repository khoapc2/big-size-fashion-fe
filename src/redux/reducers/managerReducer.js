import {
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
  VIEW_OWN_PROFILE_REQUEST,
  VIEW_OWN_PROFILE_FAIL,
  VIEW_OWN_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from "../../service/Validations/VarConstant";

export const listManagerReducer = (
  state = { loading: true, data: [], error: "", totalCount: 0 },
  action
) => {
  switch (action.type) {
    case MANAGER_LIST_REQUEST:
      return { ...state, loading: true };
    case MANAGER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content,
        totalCount: action.payload.total_count,
      };
    case MANAGER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewOwnProfileReducer = (state = { loading: true, data: [], error: "" }, action) => {
  switch (action.type) {
    case VIEW_OWN_PROFILE_REQUEST:
      return { ...state, loading: true };
    case VIEW_OWN_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case VIEW_OWN_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
