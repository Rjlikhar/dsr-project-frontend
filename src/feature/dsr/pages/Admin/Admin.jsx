import DsrApproval from "./component/DsrApproval";
import DsrApprovalList from "./component/DsrAprrovalList";
import HeroHeader from "./component/HeroHeader";
import UserForm from "./component/UserForm";

export default function Admin() {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <HeroHeader/>
        <DsrApprovalList/>
        <UserForm/>
      </div>
    </div>
  );
}