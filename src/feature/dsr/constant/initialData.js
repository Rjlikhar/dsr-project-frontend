const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate());
  return d.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);
const nextDay = 1;

export const initialData = {
  meta: {
    date: getYesterday(),
    mentor: currentUser?.mentor || "",
    codeReviewer: currentUser?.code_reviewer || "",
    bootcamp: { day: nextDay },
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
  nextPlan: { date: getTomorrowDate(), tasks: [] },
};