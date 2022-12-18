import { atom, useAtom } from "jotai";
import { Sidebar } from "../../components/Admin/Sidebar";
import { Main } from "../../components/Admin/Main";

// 型
type TabList = {
  num: number;
  display: boolean;
};

type Tab = {
  overview: TabList;
  boxes: TabList;
};

const tabAtom = atom<Tab>({
  overview: {
    num: 0,
    display: true,
  },
  boxes: {
    num: 0,
    display: false,
  },
});

//headerコンポーネントへ渡す
export const spMenuAtom = atom(false);

const AdminPage = () => {
  const [isTab, setTabState] = useAtom(tabAtom);
  // 文字列キーと初期値を設定
  const [isspMenu, setspMenu] = useAtom(spMenuAtom);

  const changeTab = (title: string, num: number) => {
    if (title == "overview") {
      setTabState({
        overview: { display: true, num: num },
        boxes: { display: false, num: 0 },
      });
    }
    if (title == "boxes") {
      setTabState({
        overview: { display: false, num: 0 },
        boxes: { display: true, num: num },
      });
    }
  };

  const isExit = (target: any) => {
    const value: any = Object.values(target);
    if (value.indexOf(true) != -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Sidebar
        isspMenu={isspMenu}
        isTab={isTab}
        isExit={isExit}
        changeTab={changeTab}
      />
      <Main isTab={isTab} />
    </>
  );
};

export default AdminPage;
