import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { _getAllRequests } from "~/api/request";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "./layout";

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
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: _getAllRequests,
  });

  console.log(data);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-full w-full gap-4">
        <div className="hidden h-full w-7/12 lg:block">
          <Map requests={data ?? []} />
        </div>
        <RequestsList requests={data ?? []} isAdmin />
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
