import { NextPage } from "next";
import Link from "next/link";
import { useAtom } from "jotai";
import { authInfo } from "./_app";

const Home: NextPage = () => {
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 px-2">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:pt-16 sm:pb-12 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center md:max-w-3xl">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
              好きな顔アンケート
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              只今、顔の好みについてのアンケートを実施しており、ご協力いただけますと幸いです。
            </p>
            {!isAuthInfo.id ? (
              <Link
                href="/auth/register"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 block"
              >
                会員登録して参加する
              </Link>
            ) : (
              <></>
            )}
            <Link
              href="/vote"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 block"
            >
              投票一覧はこちら
            </Link>
          </div>
        </div>
        {!isAuthInfo.id ? (
          <div
            className="py-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 max-w-lg mx-auto text-center md:text-base"
            role="alert"
          >
            <p>
              既にアカウントを所持されている方は
              <Link href="/auth/login" className="text-red-400 hover:underline">
                こちら
              </Link>
            </p>
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default Home;
