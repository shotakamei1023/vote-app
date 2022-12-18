import { useBoxes } from "../hooks/useBoxes";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const messageAtom = atom({
  success: false,
  error: false,
});

export const BoxList = ({ user }: any) => {
  const { isLoading, boxes } = useBoxes();
  const [isMessage, setMessage] = useAtom(messageAtom);

  //投票ロジック
  const vote = async (id: string) => {
    const db = getFirestore();

    //1度しか投票できないようにする
    if (user.vote || isMessage.success) {
      setMessage({
        success: isMessage.success,
        error: true,
      });
    } else {
      await addDoc(collection(db, "boxes", id, "votes"), {
        box_id: id,
        user_id: user.id,
      });
      setMessage({
        success: true,
        error: isMessage.error,
      });
    }
  };

  useEffect(() => {}, []);

  if (isLoading) return <p>投票データ読み込み中です</p>;
  return (
    <section className="bg-white dark:bg-gray-900 w-full col-[1_/_span_2]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            投票をお願いします。
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            1アカウント1票までの投票になりますので注意ください。
          </p>
          {isMessage.error ? (
            <div
              className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">【注意】</span>
              既にあなたは投票を完了しています。
            </div>
          ) : isMessage.success ? (
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span className="font-medium">【成功】</span> 投票が完了しました。
            </div>
          ) : (
            <></>
          )}
        </div>
        <ul className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {boxes.map((box: any, index: number) => {
            return (
              <li key={index}>
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <img
                      src={
                        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                      }
                      alt="プロフィール写真"
                      className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {box.name}さん
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      Marketing & Sale
                    </span>
                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                      ここに紹介文が入ります。
                    </p>
                    <button
                      type="button"
                      onClick={() => vote(box.id)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        投票する
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
