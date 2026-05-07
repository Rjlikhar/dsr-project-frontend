export function ScoreSlider({ label, value, onChange, accent, trackAccent }) {
  const pct = (value / 10) * 100;
  const color =
    value >= 7
      ? "text-emerald-600"
      : value >= 4
        ? "text-amber-600"
        : "text-rose-500";
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 ${trackAccent} opacity-30 transition-all duration-300`}
        style={{ width: `${pct}%` }}
      />
      <div className="relative flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <span className={`text-2xl font-black tabular-nums ${color}`}>
          {value}
          <span className="text-xs font-normal text-slate-300 ml-0.5">/10</span>
        </span>
      </div>
      <div className={`relative h-1.5 ${trackAccent} rounded-full opacity-40`}>
        <div
          className={`absolute left-0 top-0 h-1.5 rounded-full ${accent} opacity-100 transition-all`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
