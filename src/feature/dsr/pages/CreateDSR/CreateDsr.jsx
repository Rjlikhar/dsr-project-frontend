import { useState, useEffect } from "react";
import { getUser, saveUser } from "../../utils/storage";
import { STATUS_META } from "../../constant/status";
import Section from "../../../../component/common/Section";
import { ScoreSlider } from "../../component/ScoreSlider";
import { TimeBar } from "../../component/TimeBar";
import { TaskCard } from "../../component/TaskCard";
import { Field } from "../../../../component/common/Field";
import { Toast } from "../../../../component/common/Toast";
import { useDsr } from "../../hooks/useDsr";
import { buildEmailHTML, DSRPreviewModal } from "../../component/DSRPreviewModal";
import { dsrService } from "../../services/dsrService";
import { initialData } from "../../constant/initialData";
import FullScreenLoader from "../../../../component/common/Loader";
import {
  FiCalendar,
  FiEdit3,
  FiUser,
  FiAward,
} from "react-icons/fi";
import DSRHeroHeader from "./component/DSRHeroHeader";
import TimeAllocationSection from "./component/TimeAllocationSection";
import TasksSection from "./component/TasksSection";
import ChallengesSection from "./component/ChallengesSection";
import ReferencesSection from "./component/ReferencesSection";
import NextDayPlanSection from "./component/NextDayPlanSection";
import ActionButtons from "./component/ActionButtons";


export default function CreateDSR() {
  const {
    data,
    setData,
    setPath,
    setToast,
    toast,
    handleSave,
    handleSend,
    loader,
    setLoader
  } = useDsr();

  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition";
  const textareaCls = `${inputCls} resize-y min-h-[50px]`;
  const challenges = data.challenges;
  const [showPreview, setShowPreview] = useState(false);
  const emailHTML = buildEmailHTML(data);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // useEffect(() => {
  //   const fetchLastDsr = async () => {
  //     try {
  //       setLoader(true)
  //       const allDsrs = await dsrService.getAllDsrs();
  //       const userDsrs = allDsrs.data.filter((dsr) => dsr.user_id === user?.id);
  //       if (userDsrs.length > 0) {
  //         const lastDsr = userDsrs.sort(
  //           (a, b) => new Date(b.work_date) - new Date(a.work_date),
  //         )[0];
  //         //   // Set only DSR data structure
  //         setData((prev) => ({
  //           ...initialData,
  //           ...prev,
  //           ...lastDsr.data,
  //           meta: {
  //             ...initialData.meta,
  //             ...prev.meta,
  //             ...lastDsr.data?.meta,
  //           },
  //           time: {
  //             ...initialData.time,
  //             ...lastDsr.data?.time,
  //             distribution: {
  //               ...initialData.time.distribution,
  //               ...lastDsr.data?.time?.distribution,
  //             },
  //           },
  //           nextPlan: {
  //             ...initialData.nextPlan,
  //             ...lastDsr.data?.nextPlan,
  //           },
  //         }));
  //       } else {
  //         setData(initialData);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch last DSR:", error);
  //       setData(initialData);
  //     } finally {
  //       setLoader(false)
  //     }
  //   };

  //   fetchLastDsr();
  // }, []);

  // Load
  // useEffect(() => {
  //   const user = getUser();
  //   if (user) {
  //     setData((prev) => ({
  //       ...prev,
  //       meta: {
  //         ...prev.meta,
  //         ...user,
  //       },
  //     }));
  //   }
  // }, []);

  // useEffect(() => {
  //   saveUser({
  //     userId: data.meta?.userId,
  //     mentor: data.meta?.mentor,
  //     codeReviewer: data.meta?.codeReviewer,
  //   });
  // }, [data.meta?.mentor, data.meta?.codeReviewer, data.meta?.userId]);

  const totalHours = Object.values(data.time?.distribution || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0,
  );

  return (
    <>
      <FullScreenLoader loading={loader} />
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">

          <DSRHeroHeader
            data={data}
            setPath={setPath}
          />
          {/* ── Cards ── */}
          <div className="flex flex-col gap-4">
            {/* Scores */}
            <Section icon="📊" title="Scores">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ScoreSlider
                  label="Productivity Score"
                  value={data.meta?.scores.productivity}
                  onChange={(v) => setPath(["meta", "scores", "productivity"], v)}
                  accent="bg-blue-500"
                  trackAccent="bg-blue-200"
                />
                <ScoreSlider
                  label="Project Impact Score"
                  value={data.meta?.scores.impact}
                  onChange={(v) => setPath(["meta", "scores", "impact"], v)}
                  accent="bg-violet-500"
                  trackAccent="bg-violet-200"
                />
              </div>
            </Section>

            <TimeAllocationSection
              data={data}
              setData={setData}
              totalHours={totalHours}
              TimeBar={TimeBar}
              Section={Section}
            />

            <TasksSection
              data={data}
              setData={setData}
              STATUS_META={STATUS_META}
              TaskCard={TaskCard}
              Section={Section}
            />

            <ChallengesSection
              challenges={challenges}
              Section={Section}
              data={data}
              setData={setData}
            />

            <ReferencesSection
              data={data}
              setData={setData}
              Field={Field}
              Section={Section}
              textareaCls={textareaCls}
            />

            <NextDayPlanSection
              data={data}
              Section={Section}
              Field={Field}
              inputCls={inputCls}
              setPath={setPath}
              setData={setData}
            />

            <ActionButtons
              handleSave={handleSave}
              setShowPreview={setShowPreview}
              handleSend={handleSend}
              user={user}
              data={data}
              emailHTML={emailHTML}
              setToast={setToast}
            />

            {showPreview && (
              <DSRPreviewModal
                html={emailHTML}
                onClose={() => setShowPreview(false)}
              />
            )}
          </div>
        </div>

        <Toast msg={toast.msg} show={toast.show} code={toast.code} />
      </div>
    </>
  );
}
