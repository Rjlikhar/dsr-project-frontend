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
      const response = await dsrRepository.getAll();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch DSRs:", error);
      throw error;
    }
  },

  async sendDsr(payload) {
    return await dsrRepository.sendDsr(payload);
  },
};
