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
      const response = await dsrRepository.getAll();
      return response.data;
  },


  async sendDsr(payload) {
    return await dsrRepository.sendDsr(payload);
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


  async getDraftDsr(){
      const res = await dsrRepository.getDraftDsr();
      return res.data;
  }
};
