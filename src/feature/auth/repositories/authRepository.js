import { client } from "../../../api/apiclient";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const authRepository = {
  register: (payload) => client.post(API_ENDPOINTS.AUTH.REGISTER, payload),

  login: (payload) => client.post(API_ENDPOINTS.AUTH.LOGIN, payload),

  me: () => client.get(API_ENDPOINTS.AUTH.ME),

  logout: () => client.post(API_ENDPOINTS.AUTH.LOGOUT),

  changePassword: (payload) => client.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload),

  appPassword: (payload) =>  {client.put(API_ENDPOINTS.AUTH.APP_PASSWORD, payload)},

  updateMentorReviewer: (id, payload) => client.put(API_ENDPOINTS.AUTH.UPDATE_MENTOR_REVIEWER(id),payload)
};
