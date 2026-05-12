import { client } from "../../../api/apiclient";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const adminRepository = {
  sendDsrApprovalRequest: (payload) => client.post(API_ENDPOINTS.MISSED_DSR_REQUEST.SEND_REQUEST,payload),

  getAllDsrRequest : () => client.get(API_ENDPOINTS.MISSED_DSR_REQUEST.GET_ALL),  

  updateStatus: (id, payload) => client.put(API_ENDPOINTS.MISSED_DSR_REQUEST.UPDATE_STATUS(id),payload,),

  getMissedDsrNotifications: () => client.get(API_ENDPOINTS.MISSED_DSR_REQUEST.NOTIFICATIONS),
};
