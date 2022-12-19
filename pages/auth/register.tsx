import { NextPage } from "next";
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import {
  checkEmail,
  checkPassword,
  changeMessage,
} from "../../utils/auth/validation";

const nameAtom = atom("");
const emailAtom = atom("");
const passwordAtom = atom("");
const create = atom(false);
export const ErrorAtom = atom({
  email: false,
  password: false,
});
const ErrorMessage = atom("");

export const RegisterPage: NextPage = () => {
  const router = useRouter();
  const [isName, setName] = useAtom(nameAtom);
  const [isEmail, setEmail] = useAtom(emailAtom);
  const [isPassword, setPassword] = useAtom(passwordAtom);
  const [iscreate, setcreate] = useAtom(create);
  const [isError, setError] = useAtom(ErrorAtom);
  const [isErrorMessage, setErrorMessage] = useAtom(ErrorMessage);

  const signup = () => {
    setcreate(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, isEmail, isPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      //usersテーブルにも保存
      .then((user) => {
        const db = getFirestore();
        setDoc(doc(db, "users", user.uid), {
          name: isName,
          auth_id: isEmail,
          role: 1,
        });
        setcreate(false);
      })
      .then(() => {
        router.push(
          {
            pathname: "/vote", //URL
            query: { register: "success" }, //検索クエリ
          },
          "/vote"
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setcreate(false);
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-screen">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                アカウント作成画面
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    名前
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="田中太郎"
                    required
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
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
                    isName &&
                    isEmail &&
                    isPassword &&
                    isError.email == false &&
                    isError.password == false
                      ? "pointer-events-auto bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
                      : "pointer-events-none dark:bg-primary-900"
                  } ${
                    iscreate ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                  onClick={() => signup()}
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
                    {!iscreate
                      ? "アカウントを作成する"
                      : "アカウントを作成中です"}
                  </span>
                </button>
                <p className="text-sm text-red-600 dark:text-red-500">
                  {isErrorMessage ? changeMessage(isErrorMessage) : ""}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link
                    href="/auth/login"
                    className="font-medium text-primary-600 hover:underline
                    dark:text-primary-500"
                  >
                    アカウント作成済みの方はこちら
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

export default RegisterPage;
