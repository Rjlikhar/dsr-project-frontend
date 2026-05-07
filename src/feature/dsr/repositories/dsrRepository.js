import { client } from "../../../api/apiclient";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const dsrRepository = {
  create: (payload) => client.post(API_ENDPOINTS.DSR.CREATE, payload),

  getAll: () => client.get(API_ENDPOINTS.DSR.GET_ALL),

  getById: (id) => client.get(API_ENDPOINTS.DSR.GET_BY_ID(id)),

  update: (id, payload) => client.put(API_ENDPOINTS.DSR.UPDATE(id), payload),

  delete: (id) => client.delete(API_ENDPOINTS.DSR.DELETE(id)),

  sendDsr: (payload) => client.post("/dsr/send", payload),

  mentorApprove: (id) => client.post(API_ENDPOINTS.DSR.MENTOR_APPROVE(id)),

  reviewerApprove: (id) => client.post(API_ENDPOINTS.DSR.REVIEW_APPROVE(id)),

  reject: (id) => client.post(API_ENDPOINTS.DSR.REJECT(id)),
};
