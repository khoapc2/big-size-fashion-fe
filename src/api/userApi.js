import axios from "./axios";

const URL_ENTITY = "/v1/accounts";

const userApi = {
  login: async (params) => {
    // console.log(`I came here ${params}`);
    // console.log(param);
    // const params = {
    //   username: "hieutt",
    //   password: "blackpink",
    // };
    const url = `${URL_ENTITY}/login`;
    const result = await axios.post(url, params);
    return result;
  },
};

export default userApi;
