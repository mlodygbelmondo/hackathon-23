import type { NextPage } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
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
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <div>
      <PrelineScript />
      <SessionProvider session={pageProps.session}>
        {getLayout(
          <>
            <Component {...pageProps} />
          </>,
        )}
      </SessionProvider>
    </div>
  );
}

export default MyApp;
