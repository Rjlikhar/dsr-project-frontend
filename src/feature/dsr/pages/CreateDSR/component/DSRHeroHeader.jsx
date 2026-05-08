import { useState } from "react";
import { FiAward, FiCalendar, FiEdit3, FiUser } from "react-icons/fi";

const DSRHeroHeader = ({
    data,
    setPath,
    fmtDate,
}) => {

    const [isEdit, setIsEdit] = useState(false);

    const getYesterday = () => {
        const d = new Date();
        d.setDate(d.getDate());
        return d.toISOString().split("T")[0];
    };

    const yesterday = getYesterday();

    const handleConfirmEdit = () => {
        console.log("Updated Header Data:", {
            mentor: data.meta?.mentor,
            codeReviewer: data.meta?.codeReviewer,
            date: data.meta?.date,
        });

        setIsEdit(false);
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
                        <h1 className="text-[26px] font-black leading-tight tracking-tight text-slate-800">
                            Daily Status Report
                        </h1>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <FiCalendar className="h-4 w-4" />
                            <span>{fmtDate(data.meta?.date)}</span>
                        </div>
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">

                    {/* Date Picker */}
                    <div className="relative">
                        <input
                            type="date"
                            value={data.meta?.date}
                            min={yesterday}
                            max={yesterday}
                            onChange={(e) => setPath(["meta", "date"], e.target.value)}
                            className="
            h-11 rounded-xl border border-slate-200
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