import { NextPage } from "next";
import { atom, useAtom } from "jotai";
import { Sidebar } from "../../components/Admin/Sidebar";
import { Main } from "../../components/Admin/Main";
import { Tab } from "../../types";

const tabAtom = atom<Tab>({
  overview: {
    display: true,
    num: 0,
  },
  boxes: {
    display: false,
    num: 0,
  },
});

//headerコンポーネントへ渡す
export const spMenuAtom = atom(false);

const AdminPage: NextPage = () => {
  const [isTab, setTabState] = useAtom(tabAtom);
  // 文字列キーと初期値を設定
  const [isspMenu, setspMenu] = useAtom(spMenuAtom);

  const changeTab = (title: string, num: number): Tab | undefined => {
    if (title == "overview") {
      setTabState({
        overview: { display: true, num: num },
        boxes: { display: false, num: 0 },
      });
      return;
    }
    if (title == "boxes") {
      setTabState({
        overview: { display: false, num: 0 },
        boxes: { display: true, num: num },
      });
      return;
    }
    return;
  };

  return (
    <>
      <Sidebar isspMenu={isspMenu} isTab={isTab} changeTab={changeTab} />
      <Main isTab={isTab} />
    </>
  );
};

export default AdminPage;
