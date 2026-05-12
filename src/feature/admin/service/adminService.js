import { adminRepository } from "../repositories/adminRepository";

export const adminService = {
  async sendDsrApprovalRequest(payload) {
    try {
      const response = await adminRepository.sendDsrApprovalRequest(payload);

      return response.data;
    } catch (error) {
      console.error("Failed to send missed DSR request:", error);

      throw error;
    }
  },

  async getAllMissedDsrRequests() {
    try {
      const response = await adminRepository.getAllDsrRequest();

      return response.data;
    } catch (error) {
      console.error("Error fetching missed DSR requests:", error);

      throw error;
    }
  },

  async updateMissedDsrStatus(id, status) {
    try {
      const response = await adminRepository.updateStatus(id, status);
      return response.data;
    } catch (error) {
      console.error("Error updating missed DSR status:", error);

      throw error;
    }
  },

  async getMissedDsrNotifications() {
    try {
      const response = await adminRepository.getMissedDsrNotifications();

      return response.data;
    } catch (error) {
      console.error("Error fetching missed DSR notifications:", error);

      throw error;
    }
  },
};
