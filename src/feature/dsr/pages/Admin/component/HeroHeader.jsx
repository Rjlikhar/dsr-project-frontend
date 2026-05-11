import { FiShield, FiUserPlus } from "react-icons/fi";
import { StatCard } from "../../Dashboard/component/StateCard";

export default function HeroHeader({showModal, setShowModal}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin panel</h2>

          <p className="text-slate-500 mt-1">
            Manage users, roles, and bootcamp assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Add User Button */}
          <button
            onClick={() => setShowModal(true)}
            className="
        h-11 px-5 rounded-xl
        bg-indigo-500 hover:bg-indigo-600
        text-white text-sm font-semibold
        flex items-center gap-2
        shadow-sm transition
      "
          >
            <FiUserPlus className="w-4 h-4" />
            Add User
          </button>

          {/* Admin Badge */}
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-4 py-2 rounded-xl">
            <FiShield className="w-4 h-4" />
            Super Admin
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value={48} sub="All time" accent="blue" />

        <StatCard
          label="Active Trainees"
          value={12}
          sub="Current batch"
          accent="green"
        />

        <StatCard
          label="Departments"
          value={6}
          sub="Across org"
          accent="amber"
        />

        <StatCard label="Admins" value={3} sub="Access level" accent="purple" />
      </div>
    </>
  );
}
