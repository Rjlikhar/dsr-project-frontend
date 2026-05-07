export const ScoreBar = ({ value, max = 10, color }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} className={`h-1.5 w-5 rounded-full ${i < value ? color : "bg-slate-100"}`} />
    ))}
    <span className="text-xs text-slate-500 ml-1">{value}/{max}</span>
  </div>
);