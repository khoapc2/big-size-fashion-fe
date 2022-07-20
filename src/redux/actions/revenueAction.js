import revenueApi from "../../api/revenueApi";
// import orderApi from "../../api/orderApi";
import {
  REVENUE_MANAGER_REQUEST,
  REVENUE_MANAGER_SUCCESS,
  REVENUE_MANAGER_FAIL,
} from "../../service/Validations/VarConstant";

export const listRevenueInMonthAction = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: REVENUE_MANAGER_REQUEST });
  try {
    const params = {
      Month: data.month,
      Year: data.year,
    };
    const response = await revenueApi.getRevenueManager(params);
    // const responseOrderToday = await orderApi.orderToday();
    dispatch({
      type: REVENUE_MANAGER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: REVENUE_MANAGER_FAIL, payload: message });
  }
};
