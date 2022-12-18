import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import {
  getFirestore,
  collection,
  getCountFromServer,
  query,
} from "firebase/firestore";

const sumTurnoutAtom = atom(0);
const usersCountAtom = atom(0);

export const OverviewAside = ({ num, boxes }: any) => {
  const [isSumTurnout, setSumTurnout] = useAtom(sumTurnoutAtom);
  const [isUsersCount, setUsersCount] = useAtom(usersCountAtom);
  const values = boxes.map((item: any) => Number(item.count));
  //投票数
  const boxvotesCount: number = values.reduce(
    (sum: number, element: number) => {
      return sum + element;
    }
  );
  //ユーザー数

  useEffect(() => {
    const getUsersCount = async () => {
      const db = getFirestore();
      //ユーザー数取得
      const collectionRef = collection(db, "users");
      const totalCount = await getCountFromServer(query(collectionRef));
      setUsersCount(totalCount.data().count);
    };
    getUsersCount();
    setSumTurnout(Math.round(100 * (boxvotesCount / isUsersCount)));
  }, [isUsersCount]);

  if (num == 0) {
    return (
      <>
        <aside className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {isUsersCount}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  ユーザー数
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                  {boxvotesCount}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  投票数
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt
                  className={`mb-2 text-3xl md:text-4xl font-extrabold ${
                    isSumTurnout != Infinity ? " opacity-100" : " opacity-0"
                  }`}
                >
                  {isSumTurnout != Infinity ? isSumTurnout + "%" : "計算中"}
                </dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">
                  投票率
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </>
    );
  } else {
    return <></>;
  }
};
