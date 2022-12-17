import { BoxList } from "../components/BoxList";
import "../utils/firebase/init";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { User } from "../utils/firebase/users";
import { authInfo } from "./_app";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const Home = ({}: User) => {
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);

  // useEffect(() => {
  //   console.log("ここ");
  //   console.log(isAuthInfo);
  //   if (isAuthInfo.id) {
  //     return console.log("取得しました");
  //   } else {
  //     return console.log("取得中です。");
  //   }
  // }, [isAuthInfo]);

  return (
    <>
      <BoxList user={isAuthInfo} />
    </>
  );
};

export default Home;
