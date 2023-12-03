import { useQuery } from "@tanstack/react-query";
import { type ReactElement } from "react";
import { _getPendingRequests } from "~/api/request";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "./layout";

const Page: NextPageWithLayout = () => {
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: _getPendingRequests,
    refetchInterval: 1000,
  });

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
