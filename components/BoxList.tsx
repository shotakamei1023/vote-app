import { useBoxes } from "../hooks/useBoxes";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { useLayoutEffect } from "react";
import { User, Box } from "../types";
import Link from "next/link";
import { Loading } from "./Lading";
import { useRouter } from "next/router";

const messageAtom = atom({
  success: false,
  error: false,
  warning: false,
  register: false,
});

const choiceBoxAtom = atom("");

type Props = {
  user: User;
};

export const BoxList = ({ user }: Props) => {
  const { isLoading, boxes } = useBoxes();
  const [isMessage, setMessage] = useAtom(messageAtom);
  const [isChoiceBox, setChoiceBox] = useAtom(choiceBoxAtom);
  const pathParam = useRouter().query.register;
  console.log(user);
  useLayoutEffect(() => {
    //登録成功時アラート表示
    const registerFlug = (): boolean => {
      if (pathParam == "success") {
        return true;
      } else {
        return false;
      }
    };

    //エラーメッセージ初期化
    setMessage({
      success: false,
      error: false,
      warning: false,
      register: registerFlug(),
    });
  }, []);

  //投票ロジック
  const vote = async (id: string) => {
    if (user.auth_id) {
      const db = getFirestore();
      //1度しか投票できないようにする
      if (user.vote || isMessage.success) {
        setMessage({
          success: isMessage.success,
          error: true,
          warning: isMessage.warning,
          register: isMessage.register,
        });
      } else {
        await addDoc(collection(db, "boxes", id, "votes"), {
          box_id: id,
          user_id: user.id,
        });
        setMessage({
          success: true,
          error: isMessage.error,
          warning: isMessage.warning,
          register: isMessage.register,
        });
      }
    } else {
      setMessage({
        success: isMessage.success,
        error: isMessage.error,
        warning: true,
        register: isMessage.register,
      });
    }
  };

  if (isLoading) return <Loading />;
  return (
    <section className="bg-white dark:bg-gray-900 w-full col-[1_/_span_2]">
      <div className="py-8 px-4 mx-auto max-w-lg sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-2xl lg:py-12 lg:px-6 xl:px-10 2xl:px-20">
        <div className="mx-auto max-w-screen-sm text-center mb-4 sm:mb-8 md:mb-10 2xl:mb-16">
          <h2 className="mb-2 sm:mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            好きな顔へ清き1票を
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            1アカウント1票までの投票になります
          </p>
          {isMessage.error ? (
            <div
              className="p-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
              role="alert"
            >
              <span className="font-medium">【お知らせ】</span>
              既にあなたは投票を完了しています。
            </div>
          ) : isMessage.success ? (
            <div
              className="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span className="font-medium">【成功】</span>投票が完了しました。
            </div>
          ) : isMessage.warning ? (
            <>
              <div
                className="p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
                role="alert"
              >
                <span className="font-medium">【注意】</span>
                投票にはアカウントの作成が必要です
              </div>
              <Link
                href="auth/register"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                こちらより作成ください
              </Link>
            </>
          ) : isMessage.register ? (
            <>
              <div
                className="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="font-medium">【成功】</span>
                会員登録が完了しました。
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <ul className="flex items-center justify-between mb-4 md:mb-8 flex-wrap md:flex-none">
          {boxes.map((box: Box, index: number) => {
            return (
              <li
                key={index}
                className={`max-w-[164px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px] hover:border-blue-800 cursor-pointer bg-white border-4 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 mb-4 xl:mb-0 ${
                  box.id == isChoiceBox ? "  border-blue-500" : ""
                } ${user.vote == box.id ? "border-blue-500" : ""} ${
                  user.vote || isMessage.success
                    ? " pointer-events-none"
                    : " pointer-events-auto"
                }`}
                onClick={() => setChoiceBox(box.id)}
              >
                <div className="rounded-lg">
                  <img
                    className="rounded-t-md w-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                    alt=""
                  />

                  <div className="p-2 md:p-4">
                    <h5 className="mb-1 md:mb-2 text-base sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {box.name}
                    </h5>

                    <p className="md:mb-3 font-normal text-gray-700 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className={`fixed bottom-4 left-0 right-0 m-auto max-w-xs w-full z-10 md:static text-white hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-orange-600 dark:focus:ring-blue-800 md:max-w-3xl mx-auto block duration-150 ${
            isChoiceBox == ""
              ? " pointer-events-none bg-blue-900"
              : " pointer-events-auto bg-blue-600"
          } ${user.vote || isMessage.success ? "bg-orange-800" : ""}`}
          onClick={() => vote(isChoiceBox)}
        >
          <span
            className={`${user.vote || isMessage.success ? "opacity-80" : ""}`}
          >
            {user.vote || isMessage.success ? "投票完了しました" : "投票する"}
          </span>
        </button>
      </div>
    </section>
  );
};
