import { useState } from "react";
import DsrApprovalList from "./component/DsrAprrovalList";
import HeroHeader from "./component/HeroHeader";
import UserForm from "./component/UserForm";

export default function Admin() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <HeroHeader showModal={showModal} setShowModal={setShowModal} />
        <DsrApprovalList />
        {showModal && (
          <div
            className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <div
              className=" relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowModal(false)}
                className=" absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow text-slate-500"
              >
                ✕
              </button>

              <UserForm handleClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
