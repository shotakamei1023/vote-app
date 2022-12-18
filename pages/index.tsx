import { BoxList } from "../components/BoxList";
import { User } from "../utils/firebase/users";
import { authInfo } from "./_app";
import { useAtom } from "jotai";

const Home = ({}: User) => {
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  return (
    <>
      <BoxList user={isAuthInfo} />
    </>
  );
};

export default Home;
