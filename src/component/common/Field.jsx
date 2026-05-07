export function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
