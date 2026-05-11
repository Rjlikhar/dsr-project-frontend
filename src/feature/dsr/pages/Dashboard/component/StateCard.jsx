export function StatCard({ label, value, sub, accent }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-400 to-emerald-600",
    amber: "from-amber-400 to-amber-500",
    purple: "from-violet-400 to-violet-600",
  };
  return (
      <div className="relative isolate bg-white rounded-2xl shadow p-5 gap-1 overflow-hidden">
        <div
          className={` absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 pointer-events-none z-0 bg-gradient-to-br ${colors[accent] || colors.blue}
  `}
        />
        <p className="relative z-10 text-sm text-slate-400">{label}</p>
        <p className="relative z-10 text-3xl font-bold text-slate-800">{value}</p>
        {sub && <p className="relative z-10 text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    );
  }