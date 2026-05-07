export default function Section({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <span className="text-sm">{icon}</span>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
