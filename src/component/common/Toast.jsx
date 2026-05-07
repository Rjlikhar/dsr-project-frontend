export function Toast({ msg, show, code }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl transition-all duration-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      {code==200?<span className="text-emerald-400 text-base">✓</span>:<span className="text-red-500 text-base">X</span>}{msg}
    </div>
  );
}
