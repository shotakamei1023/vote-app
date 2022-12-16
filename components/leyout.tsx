import { ReactElement } from "react";
import Head from "next/head";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>投票アプリ</title>
        <meta property="og:title" content="投票アプリ" key="title" />
      </Head>
      {children}
    </>
  );
};
