import { useEffect, useState } from "react";
import { dsrService } from "../services/dsrService";

const getYesterday = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

export const useInitialData = () => {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchDsrs = async () => {
      try {
        const currentUser = JSON.parse(
          localStorage.getItem("currentUser")
        );

        const token = localStorage.getItem("currentUser");

        let allDsrs = [];

        if (token) {
          allDsrs = await dsrService.getAllDsrs();
        }

        const nextDay = (allDsrs?.length || 0) + 1;

        setInitialData({
          meta: {
            date: getYesterday(),
            mentor: currentUser?.mentor || "",
            codeReviewer: currentUser?.code_reviewer || "",
            bootcamp: { day: nextDay },
            scores: { productivity: 0, impact: 0 },
          },
          time: {
            totalHours: 0,
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
        });
      } catch (error) {
        console.error("Error fetching DSRs:", error);
      }
    };

    fetchDsrs();
  }, []);

  return initialData;
};