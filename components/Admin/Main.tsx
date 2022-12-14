import "../../utils/firebase/init";
import { useBoxes } from "../../hooks/useBoxes";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";

export const Main = ({ isTab }: any) => {
  const { isLoading, boxes } = useBoxes();
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <main className="row-[2] col-[2]">
        {isTab.overview[0] ? (
          <div>
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      73M+
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      ユーザー数
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      1B+
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      投票数
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      4M+
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      投票率
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        ) : isTab.boxes[0] ? (
          <>
            {" "}
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
                  {boxes.map((item: any, index: number) => {
                    return (
                      <div
                        className="flex flex-col items-center justify-center"
                        key={index}
                      >
                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                          {item.name}
                        </dt>
                        <dd className=" text-gray-500 dark:text-gray-400">
                          {item.count}票
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </section>
          </>
        ) : isTab.boxes[1] ? (
          <>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      名前
                    </th>
                    <th scope="col" className="py-3 px-6">
                      投票数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boxes.map((item: any, index: number) => {
                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name}
                        </th>
                        <td className="py-4 px-6">{item.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
