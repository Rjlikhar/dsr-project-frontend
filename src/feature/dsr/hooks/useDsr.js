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
    toast,
    setToast, 
    handleSave,
    handleSend,
    loader,
    setLoader
  };
};
