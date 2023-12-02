import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "../layout";
import Map from "~/components/Map/Map";

const Page: NextPageWithLayout = () => {
  return (
    <div className="h-[100%] w-full">
      halo
      <Map reports={[]} />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
