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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="dark:bg-gray-900">{children}</main>
    </>
  );
};
