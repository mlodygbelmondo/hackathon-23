import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "../layout";
import Map from "~/components/Map/Map";

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <p className="text-2xl font-bold">Raporty na mapie</p>
      <div className="h-[calc(100%-70px)] w-7/12 overflow-hidden rounded-2xl border border-gray-300 shadow-sm">
        <Map reports={[]} />
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
