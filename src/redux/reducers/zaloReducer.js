import { GET_ZALO_LINK_SUCCESS, GET_ZALO_LINK_FAIL } from "../../service/Validations/VarConstant";

export const zaloLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ZALO_LINK_SUCCESS:
      return { data: action.payload };
    case GET_ZALO_LINK_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
