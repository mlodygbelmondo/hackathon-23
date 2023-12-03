import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "./admin/layout";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";

const mockedRequests = [
  {
    id: "1",
    lat: 51.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
  {
    id: "2",
    lat: 61.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
  {
    id: "3",
    lat: 55.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
  {
    id: "4",
    lat: 58.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
  {
    id: "5",
    lat: 49.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
  {
    id: "6",
    lat: 47.11,
    lng: 17.03,
    cableName: "essa kabel",
    author: "Jan Kowalski",
    date: "2021-10-10",
  },
];

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-full w-full gap-4">
        <div className="hidden h-full w-7/12 lg:block">
          <Map requests={mockedRequests} />
        </div>
        <RequestsList requests={mockedRequests} />
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
