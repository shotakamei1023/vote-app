import { BoxList } from "../components/BoxList";
import "../utils/firebase/init";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Home = ({}) => {
  return (
    <>
      <BoxList />
    </>
  );
};

export default Home;
