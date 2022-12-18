import { NextPage } from "next";
import { BoxList } from "../components/BoxList";
import { authInfo } from "./_app";
import { useAtom } from "jotai";

const Home: NextPage = () => {
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  return (
    <>
      <BoxList user={isAuthInfo} />
    </>
  );
};

export default Home;
