import { type ReactNode } from "react";
import Navbar from "~/components/DashboardLayout/Navbar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="h-[calc(100%-80px)] px-4 lg:pl-0">{children}</div>
    </div>
  );
};
export default DashboardLayout;
