import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { NextPage } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { Toaster } from "react-hot-toast";
import FormModal from "~/components/FormModal/FormModal";
import PrelineScript from "~/components/PrelineScript";
import "~/styles/globals.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session; dehydratedState: unknown }>) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  const [queryClient] = React.useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}></HydrationBoundary>
      <div>
        <Toaster />
        <PrelineScript />
        <SessionProvider session={pageProps.session}>
          {getLayout(
            <>
              <Component {...pageProps} />
            </>,
          )}
        </SessionProvider>
        <FormModal />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
