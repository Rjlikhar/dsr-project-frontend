import { fmtDate } from "../utils/date";

export default function Header({ data, setPath, isEdit, setIsEdit }) {
  return (
    <div className="bg-black text-white p-5 rounded-xl">
      <h1>DSR</h1>
      <p>{fmtDate(data.meta.date)}</p>

      <input
        type="date"
        value={data.meta.date}
        onChange={(e) => setPath(["meta", "date"], e.target.value)}
      />

      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
    </div>
  );
}
