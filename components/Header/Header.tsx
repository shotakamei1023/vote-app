import { memo } from "react";
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";

import { spMenuAtom } from "../../pages/admin/index";
import { getAuth, signOut } from "firebase/auth";

export const Header = memo(({ name }: any) => {
  const router = useRouter();
  const path = router.pathname;
  const [isspMenu, setspMenu] = useAtom(spMenuAtom);

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

  return (
    <header
      className={`${
        path == "/admin" ? "row-[1] col-[1_/_span_2]" : "col-[1_/_span_2]"
      }`}
    >
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <a href="https://flowbite.com" className="flex items-center"></a>
          <div className="flex items-center lg:order-2">
            <p className="text-white">{name ? name : ""}</p>
            <button
              type="button"
              className={`text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800`}
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
    </header>
  );
});
