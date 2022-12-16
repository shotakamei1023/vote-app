import "../../utils/firebase/init";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Admin/Sidebar";
import { Main } from "../../components/Admin/Main";

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

//headerコンポーネントへ渡す
export const spMenuAtom = atom(false);

const adminPage = () => {
  const [isTab, setTabState] = useAtom(tabAtom);
  // 文字列キーと初期値を設定
  const [isspMenu, setspMenu] = useAtom(spMenuAtom);

  const changeTab = (title: string, num: number) => {
    if (title == "overview") {
      setTabState({
        overview: { 0: true },
        boxes: { 0: false, 1: false },
      });
    }
    if (title == "boxes") {
      if (num == 0) {
        setTabState({
          overview: { 0: false },
          boxes: { 0: true, 1: false },
        });
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

export default adminPage;
