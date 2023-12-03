import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "./admin/layout";
import Map from "~/components/Map/Map";
import RequestsList from "~/components/RequestsList/RequestsList";
import { _getAllRequests } from "~/api/request";
import { useQuery } from "@tanstack/react-query";

const Page: NextPageWithLayout = () => {
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: _getAllRequests,
  });

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
