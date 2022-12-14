import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { atom, useAtom } from "jotai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  checkEmail,
  checkPassword,
  changeMessage,
} from "../../utils/auth/validation";

const emailAtom = atom("");
const passwordAtom = atom("");
const ErrorMessage = atom("");
export const ErrorAtom = atom({
  email: false,
  password: false,
});

const LoginPage: NextPage = () => {
  const [isEmail, setEmail] = useAtom(emailAtom);
  const [isPassword, setPassword] = useAtom(passwordAtom);
  const [isErrorMessage, setErrorMessage] = useAtom(ErrorMessage);
  const [isError, setError] = useAtom(ErrorAtom);
  const router = useRouter();

  const signin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, isEmail, isPassword)
      .then((userCredential) => {
        userCredential.user;
      })
      .then(() => {
        router.push("/vote");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                ログイン画面
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(event) => {
                      setEmail(event.target.value);
                      checkEmail(event.target.value, isError, setError);
                    }}
                  />
                  {isError.email && isEmail ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">
                        username@example.comの形式で入力ください
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    パスワード
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value);
                      checkPassword(event.target.value, isError, setError);
                    }}
                  />
                  {isError.password && isPassword ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">6文字以上入力ください</span>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  type="button"
                  className={`w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 ${
                    isEmail &&
                    isPassword &&
                    isError.email == false &&
                    isError.password == false
                      ? "pointer-events-auto bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
                      : "pointer-events-none dark:bg-primary-900"
                  }`}
                  onClick={() => signin()}
                >
                  <span
                    className={`${
                      isEmail &&
                      isPassword &&
                      isError.email == false &&
                      isError.password == false
                        ? "opacity-100"
                        : "opacity-40"
                    }`}
                  >
                    ログイン
                  </span>
                </button>
                <p className="text-sm text-red-600 dark:text-red-500">
                  {isErrorMessage ? changeMessage(isErrorMessage) : ""}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link
                    href="/auth/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    アカウントの新規作成はこちら
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
