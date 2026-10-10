import { useEffect, useState } from "react";
import { FiAward, FiCalendar, FiEdit3, FiUser } from "react-icons/fi";
import { dsrService } from "../../../services/dsrService";
import { authServices } from "../../../../auth/services/authServices";
import { adminService } from "../../../../admin/service/adminService";

const DSRHeroHeader = ({ data, setPath }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isEdit, setIsEdit] = useState(false);
  const [allowedDates, setAllowedDates] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await dsrService.getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGroupChange = async (e) => {
    const groupId = e.target.value;
    setSelectedGroup(groupId);
    try {
      await dsrService.updateGroup({ group_id: groupId });

      console.log("Group updated successfully");
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return d;
    }
  };

  const handleConfirmEdit = async () => {
    try {
      if (!user) {
        console.error("User not found");
        return;
      }

      const payload = {
        mentor: data.meta?.mentor,
        code_reviewer: data.meta?.codeReviewer,
      };

      await authServices.updateMentorReviewer(user.id, payload);

      const updatedUser = {
        ...user,
        mentor: payload.mentor,
        code_reviewer: payload.code_reviewer,
      };

      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Update React State
      setUser(updatedUser);

      setIsEdit(false);

      console.log("User Updated", updatedUser);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await adminService.getMissedDsrNotifications();
      if (response.status) {
        const approvedDates = response.data.map((item) =>
          formatDate(item.request_date),
        );
        setAllowedDates(approvedDates);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleDateChange = (selectedDate) => {
    const currentDate = getCurrentDate();
    console.log("currentDate", selectedDate);
    const isApprovedDate = allowedDates.includes(selectedDate);
    console.log("isApprovedDate", isApprovedDate);
    if (selectedDate !== currentDate && !isApprovedDate) {
      return;
    }

    setPath(["meta", "date"], selectedDate);
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-[28px] border border-slate-200/70 bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#eef4ff] shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%)]" />

      {/* Glass Layer */}
      <div className="absolute inset-0 backdrop-blur-[3px]" />

      {/* ── Top Section ── */}
      <div className="relative flex flex-col gap-5 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 shadow-[0_8px_24px_rgba(59,130,246,0.22)] ring-1 ring-slate-200">
            <div className="absolute inset-[1px] rounded-2xl bg-white/10 backdrop-blur-sm" />

            <span className="relative text-sm font-extrabold tracking-[0.18em] text-white">
              DSR
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[20px] font-black leading-tight tracking-tight text-slate-800">
              Daily Status Report
            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <FiCalendar className="h-4 w-4" />
              <span>{fmtDate(data.meta?.date)}</span>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="md:flex items-center gap-3">
          {/* Group Select */}
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={handleGroupChange}
              className=" h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10"
            >
              <option value="">Select Group</option>
              {groups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          {/* Date Picker */}
          <div className="relative">
            <input
              type="date"
              x
              value={data.meta?.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="
            h-11 w-full rounded-xl border border-slate-200
            bg-white px-4 text-sm text-slate-700
            shadow-sm outline-none
            transition-all duration-200
            focus:border-sky-400
            focus:ring-4 focus:ring-sky-500/10
          "
            />
          </div>

          {/* Edit / Save Buttons */}
          {isEdit ? (
            <button
              onClick={handleConfirmEdit}
              className="  flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:bg-emerald-100 "
            >
              ✓ Confirm
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="
            group relative flex h-11 w-11 items-center justify-center
            rounded-xl border border-slate-200
            bg-white text-slate-600
            transition-all duration-300
            hover:bg-slate-50 hover:text-slate-800
        "
            >
              <FiEdit3 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          )}
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="relative grid grid-cols-1 gap-4 px-6 pb-6 sm:grid-cols-3">
        {[
          {
            label: "Mentor",
            key: "mentor",
            val: data.meta?.mentor,
            icon: <FiUser className="h-4 w-4" />,
            accent: "from-sky-100 to-blue-50",
          },
          {
            label: "Reviewer",
            key: "codeReviewer",
            val: data.meta?.codeReviewer,
            icon: <FiUser className="h-4 w-4" />,
            accent: "from-indigo-100 to-violet-50",
          },
          {
            label: "Bootcamp Day",
            val: `Day ${data.meta?.bootcamp.day}`,
            icon: <FiAward className="h-4 w-4" />,
            accent: "from-emerald-100 to-teal-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`
          group relative overflow-hidden rounded-2xl
          border border-slate-200/70
          bg-gradient-to-br ${s.accent}
          backdrop-blur-xl
          p-4 shadow-sm
          transition-all duration-300
          hover:-translate-y-[2px]
          hover:shadow-md
        `}
          >
            {/* Soft Inner Overlay */}
            <div className="absolute inset-0 bg-white/40" />

            {/* Content */}
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {s.label}
                </p>

                {isEdit && (s.label === "Mentor" || s.label === "Reviewer") ? (
                  <input
                    type="text"
                    value={s.val}
                    onChange={(e) => setPath(["meta", s.key], e.target.value)}
                    placeholder={`Enter ${s.label}`}
                    className="
                  mt-2 w-full rounded-xl border border-slate-200
                  bg-white px-3 py-2 text-sm text-slate-700
                  outline-none transition
                  focus:border-sky-400
                  focus:ring-4 focus:ring-sky-500/10
                "
                  />
                ) : (
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-800">
                    {s.val}
                  </h3>
                )}
              </div>

              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DSRHeroHeader;
