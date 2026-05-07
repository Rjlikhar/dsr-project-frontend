import { TIME_META } from "../constant/time";

export function TimeBar({ keyName, value, onChange }) {
  const m = TIME_META[keyName];
  const displayValue = Math.min(value || 0, 9);
  const pct = (displayValue / 9) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-6 text-center shrink-0">{m.icon}</span>
      <span className="text-xs text-slate-500 w-36 shrink-0 font-medium">
        {m.label}
      </span>
      <div className={`relative flex-1 h-2 ${m.track} rounded-full`}>
        <div
          className={`absolute left-0 top-0 h-2 rounded-full ${m.bar} transition-all duration-200`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={0}
          max={9}
          step={0.5}
          value={Math.min(value || 0, 9)}
          onChange={(e) =>{
            const val = Number(e.target.value);
            onChange(val)
          }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-end w-16 shrink-0">
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => {
            let val = Number(e.target.value);
              if (val < 0) val = 0;
              if (val > 15) val = 15;

              onChange(val);
          }}
          className="text-sm font-bold text-slate-700 w-10 text-right tabular-nums bg-transparent outline-none"
          min="0"
          max="15"
          step="0.5"
        />
        <span className="text-sm font-bold text-slate-700 ml-1">hr</span>
      </div>
    </div>
  );
}
