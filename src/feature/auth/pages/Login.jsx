import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../../component/common/Loader";

export default function Login() {
  const inputCls =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent transition";

  const { login } = useAuth();
  const navigate = useNavigate();
    const [loader,setLoader]=useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email.trim() || !form.password.trim()) {
      alert("Email and password are required");
      return;
    }
    try {
      setLoader(true)
      const response = await login({
        email: form.email.trim(),
        password: form.password,
      });

      if(response){
        // await getCurrentUser();
        navigate("/");
      }

      setForm({
        email: "",
        password: "",
      });

    } catch (err) {
      alert(err.message)
    }finally{
      setLoader(false)
    }

  };

  return (
    <>
    <FullScreenLoader loading={loader}/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-black">
              DSR
            </div>
            <h2 className="text-xl font-black mt-3 text-slate-800">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-400">Login to your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className={inputCls}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className={inputCls}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />

            <button className="mt-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-3 rounded-2xl shadow-md hover:shadow-lg transition active:scale-[0.98]">
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 mt-5">
            Don’t have an account?{" "}
            <button
              onClick={()=>navigate("/signup")}
             className="text-blue-500 cursor-pointer hover:underline">
              Signup
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
