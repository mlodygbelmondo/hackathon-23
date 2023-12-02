import { type ReactNode } from "react";
import Header from "~/components/DashboardLayout/Header";
import Sidebar from "~/components/DashboardLayout/Sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-[100vh] bg-gray-50 dark:bg-slate-900">
      <Header />
      <Sidebar />
      <div className="relative top-[71px] h-[calc(100%-71px)] w-full px-4 pt-6 sm:px-6 md:px-8 lg:ps-72">
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
