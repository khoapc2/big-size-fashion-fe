import axios from "./axios";

const URL_ENTITY = "/v1/accounts";

const userApi = {
  login: (params) => {
    // console.log(param);
    // const params = {
    //   username: "hieutt",
    //   password: "blackpink",
    // };
    const url = `${URL_ENTITY}/login`;
    return axios.post(url, params);
  },
};

export default userApi;
