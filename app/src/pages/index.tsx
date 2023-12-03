import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { _getAllRequests } from "~/api/request";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "./admin/layout";

const Page: NextPageWithLayout = () => {
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: _getAllRequests,
    refetchInterval: 1000,
  });

  console.log(data);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-full w-full gap-4">
        <div className="hidden h-full w-7/12 lg:block">
          <Map requests={data ?? []} />
        </div>
        <RequestsList requests={data ?? []} />
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
