export const initialData = {
  meta: {
    date: "",
    mentor: "",
    codeReviewer: "",
    bootcamp: { day: 0 },
    scores: { productivity: 0, impact: 0 },
  },
  time: {
    "totalHours": 0,
    distribution: {
      development: 0,
      debugging: 0,
      planning: 0,
      learning: 0,
      meetings: 0,
    },
  },
  tasks: [],
  challenges: [],
  references: [],
  commits: [],
  nextPlan: { date: "", tasks: [] },
};
