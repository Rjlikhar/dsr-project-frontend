import { FiShield, FiUserPlus } from "react-icons/fi";
import { StatCard } from "../../dsr/pages/Dashboard/component/StateCard";
import { useEffect, useState } from "react";
import { userService } from "../../auth/services/authServices";
import FullScreenLoader from "../../../component/common/Loader";
import { dsrService } from "../../dsr/services/dsrService";

export default function HeroHeader({showModal, setShowModal}) {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    (async () => {

      try {

        setLoading(true);

        const [users, dsrs] = await Promise.all([
          userService.getAllUsers(),
          dsrService.getAllDsrs(),
        ]);

        const today =
          new Date().toISOString().split("T")[0];

        const submittedDsrs =
          (dsrs?.data || []).filter(
            ({ work_date, status }) =>
              work_date?.split("T")[0] === today &&
              status === "submitted"
          ).length;

        const totalUsers =
          users?.data?.total_users || 0;

        setCounts({
          total_users: totalUsers,

          admin_users:
            users?.data?.admin_users || 0,

          submitted_dsrs: submittedDsrs,

          pending_dsrs:
            totalUsers - submittedDsrs,
        });

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }

    })();

  }, []);

  return (
    <>
    <FullScreenLoader loading={loading} />
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
        <StatCard label="Total Users" value={counts?.total_users || 0} sub="All time" accent="blue" />

        <StatCard
          label="Total Today's DSR"
          value={counts?.submitted_dsrs || 0}
          sub="Current batch"
          accent="green"
        />

        <StatCard
          label="Today's pending DSR"
          value={counts?.pending_dsrs || 0}
          sub="Across org"
          accent="amber"
        />

        <StatCard label="Admins" value={counts?.admin_users || 0} sub="Access level" accent="purple" />
      </div>
    </>
  );
}
