import { useEffect, useState } from "react";
import { StatCard } from "./component/StateCard";
import { useNavigate } from "react-router-dom";
import DSRList from "./component/DSRList";
import { getAverageScore } from "../../utils/getProductiveAndImpactScore";
import { getDsrCount } from "../../utils/getDsrCount";
import { dsrService } from "../../services/dsrService";
import FullScreenLoader from "../../../../component/common/Loader";
import { FiAlertCircle } from "react-icons/fi";
import Notification, { Toast } from "../../../../component/common/Toast";

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [user, setUser] = useState();
  const [dsrList, setDsrList] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const DSR_STORAGE_KEY = "dsr_reports";
  const [loader,setLoader]=useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(true);


  useEffect(() => {
    const fetchDsrs = async () => {
      try {
        setLoader(true)
        const response = await dsrService.getAllDsrs();
        if (response?.success) {
          // Backend response data
          const dsrs = response.data || [];
          const sortedDsrs = dsrs.sort(
            (a, b) => new Date(b.work_date) - new Date(a.work_date),
          );

          setDsrList(sortedDsrs);
        } else {
          setDsrList([]);
        }
      } catch (error) {
        console.error("Failed to fetch DSR list:", error);
        setDsrList([]);
      }finally{
        setLoader(false)
      }
    };

    fetchDsrs();
  }, []);

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));

      if (savedUser) {
        setUser({
          name: savedUser.name || "",
          email: savedUser.email || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoader(true);

      const response = await dsrService.getMissedDsrNotifications();

      if (response.status) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Notification Fetch Error:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleClose = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };
  

  // ── Stats ──────────────────────────────────────────────────────────────
  const now = new Date();

  const monthlyCount = getDsrCount(dsrList, startDate, endDate);

  // ── Today's DSR check ──────────────────────────────────────────────────
  const todayStr = now.toISOString().split("T")[0];

  const hasTodayDSR = dsrList.some((dsr) => {
      const workDate = dsr.work_date.split("T")[0];

      return workDate === todayStr;
    });

  // Avg Productivity Score
  const avgProductiveScore = getAverageScore(
    dsrList,
    "productivity",
    startDate,
    endDate,
  );

  // Avg Project Impact Score
  const avgImpactScore = getAverageScore(dsrList, "impact", startDate, endDate);

   const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <>
    <FullScreenLoader loading={loader}/>
      {notifications.map((item) => (
        <Notification
          key={item.id}
          show={show}
          message={`Your missed DSR request for ${formatDate(item.request_date)} was approved`}
          onClose={() => handleClose(item.id)}
        />
      ))}
    <div className="flex-1 flex flex-col min-w-0">
      {/* Page Content */}
      <div className="w-full transition-all duration-300">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {getGreeting()}, {user?.name || "User"} 👋
            </h2>
            <p className="text-slate-500 mt-1">
              Here's your Daily Status Report overview.
            </p>
          </div>
           

          {/* "Add DSR today" CTA banner */}
          {!hasTodayDSR && now.getDay() !== 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    You haven't added today's DSR yet
                  </p>
                  <p className="text-xs text-slate-500">
                    Keep your streak going — add it now!
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/create-dsr")}
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Add DSR
              </button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Productive Score"
              value={avgProductiveScore}
              sub={
                startDate || endDate
                  ? "Selected range avg"
                  : "Current month avg"
              }
              accent="amber"
            />
            <StatCard
              label="Project Impact Score"
              value={avgImpactScore}
              sub={
                startDate || endDate
                  ? "Selected range avg"
                  : "Current month avg"
              }
              accent="green"
            />
            <StatCard
              label="DSR This Month"
              value={monthlyCount}
              sub="Working days only"
              accent="blue"
            />
            <StatCard
              label="Total DSRs"
              value={dsrList.length}
              sub="All time"
              accent="purple"
            />
          </div>

          {/* DSR History */}
          <DSRList
            dsrList={dsrList}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
    </div>
    </>
  );
}
