import { ReactElement } from "react";
import { Header } from "./Header/Header";
import Head from "next/head";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <Head>
      <title>投票アプリ</title>
      <meta property="og:title" content="投票アプリ" key="title" />
    </Head>
    {children}
  </>
);
