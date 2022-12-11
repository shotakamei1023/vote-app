import "../../utils/firebase/init";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Admin/Sidebar";

type overview = {
  0: boolean;
};

type boxes = {
  0: boolean;
  1: boolean;
};

type Tab = {
  overview: overview;
  boxes: boxes;
};

const tabAtom = atom<Tab>({
  overview: { 0: true },
  boxes: { 0: false, 1: false },
});

const menuAtom = atom<boolean>(false);

const adminPage = () => {
  const [isTab, setTabState] = useAtom(tabAtom);
  const [isMenu, setMenu] = useAtom(menuAtom);

  const changeTab = (title: string, num: number) => {
    if (title == "overview") {
      console.log("overvie");
      setTabState({
        overview: { 0: true },
        boxes: { 0: false, 1: false },
      });
      console.log(isTab);
    }
    if (title == "boxes") {
      console.log("boxes");
      if (num == 0) {
        setTabState({
          overview: { 0: false },
          boxes: { 0: true, 1: false },
        });
        console.log(isTab);
      }
      if (num == 1) {
        setTabState({
          overview: { 0: false },
          boxes: { 0: false, 1: true },
        });
      }
    }
  };

  const isExit = (target: any) => {
    console.log(Object.values(target));
    const value: any = Object.values(target);
    if (value.indexOf(true) != -1) {
      console.log("あるよ");
      return true;
    } else {
      console.log("ないよ");

      return false;
    }
  };

  return (
    <>
      <section className="md:grid grid-cols-adminLeyout grid-rows-adminLeyout min-h-screen">
        <Header isMenu={isMenu} setMenu={setMenu} />
        <Sidebar
          isMenu={isMenu}
          isTab={isTab}
          isExit={isExit}
          changeTab={changeTab}
        />
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
                    <div className="flex flex-col items-center justify-center">
                      <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                        A
                      </dt>
                      <dd className=" text-gray-500 dark:text-gray-400">
                        100票
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                        B
                      </dt>
                      <dd className=" text-gray-500 dark:text-gray-400">
                        100票
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                        C
                      </dt>
                      <dd className=" text-gray-500 dark:text-gray-400">
                        100票
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                        D
                      </dt>
                      <dd className=" text-gray-500 dark:text-gray-400">
                        100票
                      </dd>
                    </div>
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
                        作成者
                      </th>
                      <th scope="col" className="py-3 px-6">
                        投票数
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="py-4 px-6">Sliver</td>
                      <td className="py-4 px-6">Laptop</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Microsoft Surface Pro
                      </th>
                      <td className="py-4 px-6">White</td>
                      <td className="py-4 px-6">Laptop PC</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Magic Mouse 2
                      </th>
                      <td className="py-4 px-6">Black</td>
                      <td className="py-4 px-6">Accessories</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </main>
      </section>
    </>
  );
};

export default adminPage;
