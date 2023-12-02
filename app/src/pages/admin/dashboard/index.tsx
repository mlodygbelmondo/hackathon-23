import type { ReactElement } from "react";
import { type NextPageWithLayout } from "~/pages/_app";
import DashboardLayout from "../layout";

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
