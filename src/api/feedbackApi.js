import axios from "./axios";

const URL_ENTITY = "/v1/feedbacks";

const feedbackApi = {
  getListFeedback: (params, id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.get(url, { params });
  },
  deleteFeedback: (id) => {
    const url = `${URL_ENTITY}/${id}`;
    return axios.delete(url);
  },
};

export default feedbackApi;
