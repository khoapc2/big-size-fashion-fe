import revenueApi from "../../api/revenueApi";
// import orderApi from "../../api/orderApi";
import {
  REVENUE_MANAGER_REQUEST,
  REVENUE_MANAGER_SUCCESS,
  REVENUE_MANAGER_FAIL,
} from "../../service/Validations/VarConstant";

export const listRevenueInMonthAction =
  (data, role, storeId = 0) =>
  async (dispatch) => {
    dispatch({ type: REVENUE_MANAGER_REQUEST });
    try {
      if (role === "Manager") {
        const params = {
          Month: data.month,
          Year: data.year,
        };
        const response = await revenueApi.getRevenueManager(params);
        dispatch({
          type: REVENUE_MANAGER_SUCCESS,
          payload: response,
        });
      } else if (role === "Owner") {
        const params = {
          Month: data.month,
          Year: data.year,
        };
        const response = await revenueApi.getRevenueOwner(storeId, params);
        dispatch({
          type: REVENUE_MANAGER_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      const message =
        error.respone && error.respone.content.message
          ? error.respone.content.message
          : error.message;
      dispatch({ type: REVENUE_MANAGER_FAIL, payload: message });
    }
  };
