import { useState } from "react";
import {
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

const ROLES = [
  "Intern",
  "Trainee",
  "Developer",
  "Senior Dev",
  "Team Lead",
  "Admin",
];

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Operations",
  "HR",
];

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  department: "",
  role: "Trainee",
  mentor: "",
  codeReviewer: "",
  bootcampDay: "",
};

export default function UserForm() {
  const [form, setForm] = useState(defaultForm);

  const [showPw, setShowPw] = useState(false);

  const [success, setSuccess] = useState(false);

  const set = (key, val) => {
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async () => {
    // TODO:
    // await adminService.createUser(form)

    console.log(form);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setForm(defaultForm);
  };

  return (
    <div className="bg-white rounded-[20px] shadow p-6">
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-5 py-3 rounded-2xl mb-5">
          User added successfully!
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-dashed border-slate-200">
        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
          <FiUserPlus className="w-5 h-5 text-indigo-500" />
        </div>

        <div>
          <p className="text-[15px] font-bold text-slate-800">
            Add new user
          </p>

          <p className="text-xs text-slate-400">
            Fill in the details to create a user
          </p>
        </div>
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="First name">
          <input
            className={inp}
            placeholder="Rahul"
            value={form.firstName}
            onChange={(e) =>
              set("firstName", e.target.value)
            }
          />
        </Field>

        <Field label="Last name">
          <input
            className={inp}
            placeholder="Sharma"
            value={form.lastName}
            onChange={(e) =>
              set("lastName", e.target.value)
            }
          />
        </Field>
      </div>

      <Field label="Email address" className="mt-4">
        <input
          className={inp}
          type="email"
          placeholder="rahul@company.com"
          value={form.email}
          onChange={(e) =>
            set("email", e.target.value)
          }
        />
      </Field>

      <Field label="Password" className="mt-4">
        <div className="relative">
          <input
            className={inp + " pr-10"}
            type={showPw ? "text" : "password"}
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={(e) =>
              set("password", e.target.value)
            }
          />

          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPw ? (
              <FiEyeOff className="w-4 h-4" />
            ) : (
              <FiEye className="w-4 h-4" />
            )}
          </button>
        </div>
      </Field>

      <SectionDivider label="Organisation details" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Department">
          <div className="relative">
            <select
              className={inp + " appearance-none pr-9"}
              value={form.department}
              onChange={(e) =>
                set("department", e.target.value)
              }
            >
              <option value="">Select department</option>

              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </Field>

        <Field label="Bootcamp day">
          <input
            className={inp}
            type="number"
            min="1"
            placeholder="1"
            value={form.bootcampDay}
            onChange={(e) =>
              set("bootcampDay", e.target.value)
            }
          />
        </Field>
      </div>

      <Field label="Role" className="mt-4">
        <div className="flex flex-wrap gap-2 mt-1">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => set("role", r)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition
              ${
                form.role === r
                  ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </Field>

      <SectionDivider
        icon={<FiUsers />}
        label="Assigned contacts"
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Mentor">
          <input
            className={inp}
            placeholder="Mentor name"
            value={form.mentor}
            onChange={(e) =>
              set("mentor", e.target.value)
            }
          />
        </Field>

        <Field label="Code reviewer">
          <input
            className={inp}
            placeholder="Reviewer name"
            value={form.codeReviewer}
            onChange={(e) =>
              set("codeReviewer", e.target.value)
            }
          />
        </Field>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setForm(defaultForm)}
          className="h-10 px-6 rounded-xl border-[1.5px] border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 transition"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="h-10 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold flex items-center gap-2 transition"
        >
          <FiUserPlus className="w-4 h-4" />
          Add user
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full h-[40px] px-3.5 border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-700 bg-white outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition placeholder:text-slate-300";

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
        {label}
      </p>

      {children}
    </div>
  );
}

function SectionDivider({ icon, label }) {
  return (
    <div className="flex items-center gap-2 my-5 text-xs font-bold text-slate-400 uppercase tracking-wide">
      <hr className="flex-1 border-dashed border-slate-200" />

      <span className="flex items-center gap-1.5">
        {icon}
        {label}
      </span>

      <hr className="flex-1 border-dashed border-slate-200" />
    </div>
  );
}