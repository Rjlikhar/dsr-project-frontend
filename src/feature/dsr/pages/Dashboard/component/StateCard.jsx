export function StatCard({ label, value, sub, accent }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-400 to-emerald-600",
    amber: "from-amber-400 to-amber-500",
    purple: "from-violet-400 to-violet-600",
  };
  return (
      <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-1 relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 bg-gradient-to-br ${colors[accent] || colors.blue}`}
        />
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    );
  }