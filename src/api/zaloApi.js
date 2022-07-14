import axios from "./axios";

const URL_ENTITY = "/v1/zalo-pay/";

const zaloApi = {
  payWithZaloLink: (params) => {
    const url = `${URL_ENTITY}${params}`;
    return axios.get(url);
  },
};

export default zaloApi;
