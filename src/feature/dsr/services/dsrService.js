import { dsrRepository } from "../repositories/dsrRepository";

export const dsrService = {
  saveDsr: async (data) => {
    const payload = {
      work_date: data.meta.date,
      data: {
        meta: data.meta,
        tasks: data.tasks,
        time: data.time,
        challenges: data.challenges,
        references: data.references,
        commits: data.commits,
        nextPlan: data.nextPlan,
      },
    };

    return await dsrRepository.create(payload);
  },

  async getAllDsrs() {
    try {
      const token = localStorage.getItem("token");

      // ✅ Stop API call if token missing
      if (!token) {
        return [];
      }

      const response = await dsrRepository.getAll();

      return response.data;
    } catch (error) {
      // ✅ Handle invalid/expired token
      if (error.response?.status === 401) {
        console.warn("Unauthorized: Invalid token");

        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        return [];
      }

      console.error("Failed to fetch DSRs:", error);

      throw error;
    }
  },

  async sendDsr(payload) {
    return await dsrRepository.sendDsr(payload);
  },

  async sendDsrApprovalRequest(payload) {
    try {
      const response = await dsrRepository.sendDsrApprovalRequest(payload);

      return response.data;
    } catch (error) {
      console.error("Failed to send missed DSR request:", error);

      throw error;
    }
  },

  async getAllMissedDsrRequests() {
    try {
      const response = await dsrRepository.getAllDsrRequest();

      return response.data;
    } catch (error) {
      console.error("Error fetching missed DSR requests:", error);

      throw error;
    }
  },

  async updateMissedDsrStatus(id, status) {
    try {
      const response = await dsrRepository.updateStatus(id, status);
      return response.data;
    } catch (error) {
      console.error("Error updating missed DSR status:", error);

      throw error;
    }
  },

  async getMissedDsrNotifications() {
    try {
      const response = await dsrRepository.getMissedDsrNotifications();

      return response.data;
    } catch (error) {
      console.error("Error fetching missed DSR notifications:", error);

      throw error;
    }
  },

  async getGroups() {
    const res = await dsrRepository.getGroups();
    return res.data;
  },


  // Update group
  async updateGroup(payload){
    console.log(payload);
    const res = await dsrRepository.updateGroup(payload);
    return res.data;
  },
};
