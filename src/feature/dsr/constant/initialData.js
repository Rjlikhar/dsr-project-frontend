import { dsrService } from "../services/dsrService";

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate());
  return d.toISOString().split("T")[0];
};

const yesterday = getYesterday();
const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);
const allDsrs = await dsrService.getAllDsrs();

const nextDay = (allDsrs?.length || 0) + 1;

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
  references: [],
  commits: [],
  nextPlan: { date: "", tasks: [] },
};
