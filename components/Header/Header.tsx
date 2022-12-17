import { memo } from "react";
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";

import { spMenuAtom } from "../../pages/admin/index";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";
import { authInfo } from "../../pages/_app";
const loadingAtom = atom(false);

export const Header = memo(({ AuthInfo }: any) => {
  const router = useRouter();
  const path = router.pathname;
  const [isspMenu, setspMenu] = useAtom(spMenuAtom);
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  const [isLoading, setLoading] = useAtom(loadingAtom);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("ログアウトしました");
        router.push("/auth/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    console.log("ここ");
    console.log(isAuthInfo);
    if (isAuthInfo.id) {
      return setLoading(true);
    } else {
      return setLoading(false);
    }
  }, [isAuthInfo]);

  return (
    <header
      className={`  ${
        path == "/admin" ? "row-[1] col-[1_/_span_2]" : "col-[1_/_span_2]"
      }`}
    >
      {isLoading ? (
        <nav className="border-gray-200 py-4 bg-white dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto">
            {isAuthInfo.role == 0 ? (
              <Link
                href="/admin"
                className={`text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 `}
              >
                管理画面はこちら
              </Link>
            ) : (
              ""
            )}
            <div className="flex items-center ml-auto gap-6">
              <p className="text-white">
                {isAuthInfo.name ? isAuthInfo.name : ""}
              </p>
              <button
                type="button"
                className={`text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800`}
                onClick={() => logOut()}
              >
                ログアウト
              </button>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className={`inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
                  path != "./admin" ? "hidden" : ""
                }`}
                aria-controls="mobile-menu-2"
                aria-expanded="false"
                onClick={() => setspMenu(!isspMenu)}
              ></button>
            </div>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </header>
  );
});
