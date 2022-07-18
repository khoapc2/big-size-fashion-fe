import {
  REVENUE_MANAGER_REQUEST,
  REVENUE_MANAGER_SUCCESS,
  REVENUE_MANAGER_FAIL,
} from "../../service/Validations/VarConstant";

function formatRevenue(payload) {
  const labels = [];
  const data = [];
  let datasets = null;
  let sales = "";
  console.log(payload);
  if (payload) {
    payload.forEach((obj) => {
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

    console.log(sales);
  }
  return sales;
}

export const viewRevenueReducer = (
  state = { loading: true, data: [], error: "", revenue: "" },
  action
) => {
  console.log(action.payload);
  switch (action.type) {
    case REVENUE_MANAGER_REQUEST:
      return { ...state, loading: true };
    case REVENUE_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        revenue: formatRevenue(action.payload),
      };
    case REVENUE_MANAGER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
