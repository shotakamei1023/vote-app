import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/leyout";
import { Header } from "../components/Header/Header";
import "../utils/firebase/init";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collectionGroup,
  query,
  getDocs,
} from "firebase/firestore";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { User } from "../utils/firebase/users";

export const authInfo = atom<User>({
  id: "",
  auth_id: "",
  name: "",
  role: 0,
  vote: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const auth = getAuth();
  const router = useRouter();
  const path = router.pathname;
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      //認証確認
      if (user) {
        const uid = user.uid;
        const db = getFirestore();
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
          let voteSnap = await getDocs(query(collectionGroup(db, "votes")));
          console.log(voteSnap);

          const vote_user_ids = voteSnap.docs.map(
            (item: any, index: number) => {
              return item.data().user_id;
            }
          );
          setAuthInfo({
            id: uid,
            auth_id: docSnap.data()?.auth_id,
            name: docSnap.data()?.name,
            role: docSnap.data()?.role,
            vote: vote_user_ids.includes(uid),
          });
          if (path != "/admin") {
          } else {
            if (docSnap.data()?.role != 0) {
              router.push("/");
            }
          }
        }
        //ログイン画面に入れないようにする
        if (path.indexOf("/auth") != -1) {
          router.push("/");
        } else {
        }
      } else {
        // User is signed out
        // ...
        console.log("サインアウト");
        if (path.indexOf("/auth") != -1) {
        } else {
          router.push("/auth/register");
        }
      }
    });
  }, []);
  return path.indexOf("/auth") != -1 ? (
    <>
      <Layout>
        <div
          className={`${
            path != "/admin"
              ? ""
              : "md:grid grid-cols-adminLeyout grid-rows-adminLeyout"
          } min-h-screen`}
        >
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  ) : (
    <>
      <Layout>
        <div
          className={`${
            path != "/admin"
              ? ""
              : "md:grid grid-cols-adminLeyout grid-rows-adminLeyout"
          } min-h-screen`}
        >
          <Header />
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  );
}
