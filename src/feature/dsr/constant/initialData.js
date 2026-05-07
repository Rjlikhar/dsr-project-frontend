import { getYesterday } from "../utils/getYesterday";

export const initialData = {
  meta: {
    date: getYesterday(),
    mentor: "Hrithik Veer",
    codeReviewer: "Hrithik Veer",
    bootcamp: { day: 1 },
    scores: { productivity: 4, impact: 3 },
  },
  time: {
    "totalHours": 9,
    distribution: {
      development: 6,
      debugging: 2,
      planning: 0,
      learning: 0,
      meetings: 1,
    },
  },
  tasks: [
    {
      title: "DSM for Feb-2026 Dev Interns",
      status: "DONE",
      completion: 100,
      timeSpent: 2,
      subtasks: ["Conduct DSM session"],
    },
    {
      title: "Fix Login / Forgot Password Issue",
      status: "DONE",
      completion: 100,
      timeSpent: 2,
      subtasks: ["Resolve login issue", "Fix forgot password flow"],
    },
    {
      title: "AUTO-188 UI Revamp",
      status: "IN_PROGRESS",
      completion: 40,
      timeSpent: 2,
      subtasks: [
        "Fix Workflow/{{Id}} Menu Bar",
        "Fix Node Overlapping",
        "Landing Page Navbar",
      ],
    },
    {
      title: "Improve DSR Structure",
      status: "DONE",
      completion: 100,
      timeSpent: 2,
      subtasks: ["Refactor DSR format"],
    },
  ],
  challenges: [
    {
      challenge: "UI breaking on smaller screens",
      status: "NOT_RESOLVED",
      resolution: "",
    },
  ],
  references: [],
  commits: [],
  nextPlan: { date: "2026-04-23", tasks: ["Continue AUTO-188 : UI Revamp"] },
};
