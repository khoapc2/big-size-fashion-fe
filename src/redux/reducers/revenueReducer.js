import {
  REVENUE_MANAGER_REQUEST,
  REVENUE_MANAGER_SUCCESS,
  REVENUE_MANAGER_FAIL,
} from "../../service/Validations/VarConstant";

function formatRevenue(content) {
  const labels = [];
  const data = [];
  let datasets = null;
  let sales = "";
  const newArray = [...content.revenues];
  if (newArray) {
    newArray.forEach((obj) => {
      labels.push(obj.date.toString());
      data.push(obj.value);
    });

    datasets = {
      label: "Doanh thu",
      data,
    };

    sales = {
      labels,
      datasets,
    };
  }
  return sales;
}

export const viewRevenueReducer = (
  state = { loading: true, error: "", data: "", revenue: "" },
  action
) => {
  switch (action.type) {
    case REVENUE_MANAGER_REQUEST:
      return { ...state, loading: true };
    case REVENUE_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.content.number_orders,
        revenue: formatRevenue(action.payload.content),
      };
    case REVENUE_MANAGER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
