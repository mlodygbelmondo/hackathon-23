import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "../layout";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex h-full flex-col gap-2">
      <p className="text-2xl font-bold">Panel sterowania</p>
      <div className="flex w-full gap-4 ">
        <div className="flex h-[540px] w-[55%] flex-col items-center gap-2 overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 shadow-xl shadow-gray-100">
          <p className="w-full px-12 text-left text-2xl font-bold text-gray-900">
            Mapa ze zgłoszeniami
          </p>
          <div className="aspect-square h-[450px] overflow-hidden rounded-full border border-gray-300 shadow-xl shadow-gray-300">
            <Map requests={[]} />
          </div>
        </div>
        <div className="flex h-[540px] w-[45%] flex-col items-center gap-2 overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 shadow-xl shadow-gray-100">
          <p className="w-full px-12 text-left text-2xl font-bold text-gray-900">
            Lista zgłoszeń
          </p>
          <div className="h-0.5 w-[calc(90%)] rounded-full bg-gray-100 px-4" />
          <RequestsList />
        </div>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
