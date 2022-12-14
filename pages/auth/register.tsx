import "../../utils/firebase/init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";

const nameAtom = atom("");
const emailAtom = atom("");
const passwordAtom = atom("");
const create = atom(true);
const Error = atom({
  email: false,
  password: false,
});
const ErrorMessage = atom("");

const registerPage: NextPage = () => {
  const [isName, setName] = useAtom(nameAtom);
  const [isEmail, setEmail] = useAtom(emailAtom);
  const [isPassword, setPassword] = useAtom(passwordAtom);
  const [isError, setError] = useAtom(Error);
  const [iscreate, setcreate] = useAtom(create);
  const [isErrorMessage, setErrorMessage] = useAtom(ErrorMessage);
  const router = useRouter();

  //メールアドレスの正規表現（半角英数４桁に一致）
  var regex = new RegExp(
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  );
  const chackEmail = (value: string) => {
    //判定
    setError({
      email: !regex.test(value),
      password: false,
    });
    return !regex.test(value);
  };

  const chackPassword = (value: string) => {
    if (value.length < 6) {
      setError({
        email: isError.email,
        password: true,
      });
      return true;
    } else {
      setError({
        email: isError.email,
        password: false,
      });
      return false;
    }
  };

  const signup = () => {
    setcreate(false);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, isEmail, isPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("成功");
        console.log(user);
        //usersテーブルにも保存
        return user;
      })
      .then((user) => {
        const db = getFirestore();
        setDoc(doc(db, "users", user.uid), {
          name: isName,
          auth_id: isEmail,
          role: 1,
        });
        setcreate(true);
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("失敗");
        console.log(errorCode);
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        setcreate(true);
      });
  };

  const changeMessage = (value: string) => {
    if (value == "Firebase: Error (auth/email-already-in-use).") {
      return "既にこちらのメールアドレスは登録されています。";
    } else {
      return value;
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                      chackEmail(event.target.value);
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
                      chackPassword(event.target.value);
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
                  {iscreate ? "アカウントを作成する" : "アカウントを作成中です"}
                </button>
                <p className="text-sm text-red-600 dark:text-red-500">
                  {isErrorMessage ? changeMessage(isErrorMessage) : ""}
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    アカウント作成済みの方はこちら
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default registerPage;
