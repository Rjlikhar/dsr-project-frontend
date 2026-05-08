import { useCallback, useEffect, useState } from "react";
import { initialData } from "../constant/initialData";
import { dsrService } from "../services/dsrService";

export const useDsr = () => {
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState({ show: false, msg: "",code:"" }); 
  const challenges = data.challenges;
  const [loader,setLoader]=useState(false)


  const setPath = (path, value) =>
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      path.reduce(
        (o, k, i) => (i === path.length - 1 ? (o[k] = value) : o[k]),
        next,
      );
      return next;
    });

  const updateTask = useCallback(
    (i, task) =>
      setData((prev) => {
        const tasks = [...prev.tasks];
        tasks[i] = task;
        return { ...prev, tasks };
      }),
    [],
  );

  const addChallenge = () => {
    setData({
      ...data,
      challenges: [
        ...data.challenges,
        { challenge: "", status: "NOT_RESOLVED", resolution: "" },
      ],
    });
  };

  //  Delete row
  const deleteChallenge = (index) => {
    const updated = challenges.filter((_, i) => i !== index);
    setData({
      ...data,
      challenges: updated,
    });
  };

  //  Update field
  const updateChallenge = (index, field, value) => {
    const updated = [...challenges];
    updated[index][field] = value;

    //  Clear resolution if not solved
    if (field === "status" && value !== "RESOLVED") {
      updated[index].resolution = "";
    }

    setData({
      ...data,
      challenges: updated,
    });
  };

  // ➕ Add Reference
  const addReference = () => {
    setData((prev) => ({
      ...prev,
      references: [...prev.references, ""],
    }));
  };

  // ❌ Delete Reference
  const deleteReference = (index) => {
    setData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  // ✏️ Update Reference
  const updateReference = (index, value) => {
    const updated = [...data.references];
    updated[index] = value;

    setData((prev) => ({
      ...prev,
      references: updated,
    }));
  };

  const addCommit = () => {
    setData((prev) => ({
      ...prev,
      commits: [...prev.commits, ""],
    }));
  };

  const deleteCommit = (index) => {
    setData((prev) => ({
      ...prev,
      commits: prev.commits.filter((_, i) => i !== index),
    }));
  };

  const updateCommit = (index, value) => {
    const updated = [...data.commits];
    updated[index] = value;

    setData((prev) => ({
      ...prev,
      commits: updated,
    }));
  };

  const addNextTask = () => {
    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: [...prev.nextPlan.tasks, ""],
      },
    }));
  };

  const deleteNextTask = (index) => {
    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: prev.nextPlan.tasks.filter((_, i) => i !== index),
      },
    }));
  };

  const updateNextTask = (index, value) => {
    const updated = [...data.nextPlan.tasks];
    updated[index] = value;

    setData((prev) => ({
      ...prev,
      nextPlan: {
        ...prev.nextPlan,
        tasks: updated,
      },
    }));
  };

  const DSR_STORAGE_KEY = "dsr_reports";

  const handleSave = async () => {
    try {
      setLoader(true)
      const $response=await dsrService.saveDsr(data);
      console.log($response);
      setToast({
        show: true,
        msg: $response.data.data.message,
        code:$response.data.data.status_code
      });

      setTimeout(() => {
        setToast({ show: false, msg: "" });
      }, 3000);
    } catch (error) {
      console.error("Failed to save DSR:", error);

      setToast({
        show: true,
        msg: "Failed to save DSR",
      });
    }finally{
      setLoader(false)
    }
  };

  const handleSend = async ({ user, data, emailHTML, setToast }) => {
    try {
      setLoader(true)
      const $response=await dsrService.sendDsr({
        date: data.meta.date,
        html: emailHTML,
        sender: {
          id: user.id,
          name: user.name,
          email: user.email,
          department_id: user.department_id,
          role_id: user.role_id,
        },
        dsr_data: data, // full DSR object
      });
      setToast({
        show: true,
        msg: $response.data.data.message,
        code:$response.data.data.status_code
      });

      setTimeout(() => {
        setToast({
          show: false,
          msg: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Failed to send DSR:", error);

      setToast({
        show: true,
        msg: "Failed to send DSR.",
      });
    }
    finally{
      setLoader(false)
    }
  };

  return {
    data,
    setData,
    setPath,
    updateTask,
    toast,
    setToast, 
    addChallenge,
    deleteChallenge,
    updateChallenge,
    addReference,
    deleteReference,
    updateReference,
    addCommit,
    deleteCommit,
    updateCommit,
    addNextTask,
    deleteNextTask,
    updateNextTask,
    handleSave,
    handleSend,
    loader,
    setLoader
  };
};
