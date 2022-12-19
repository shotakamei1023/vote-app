import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/leyout";
import { Header } from "../components/Header/Header";
import "../utils/firebase/init";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collectionGroup,
  query,
  getDocs,
} from "firebase/firestore";
import { useLayoutEffect } from "react";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { User } from "../types";
import { Loading } from "../components/Lading";

export const authInfo = atom<User>({
  id: "",
  auth_id: "",
  name: "",
  role: 0,
  vote: "",
});

const loadingAtom = atom(true);

export default function App({ Component, pageProps }: AppProps) {
  const auth = getAuth();
  const router = useRouter();
  const path = router.pathname;
  const [isAuthInfo, setAuthInfo] = useAtom(authInfo);
  const [isLoading, setLoading] = useAtom(loadingAtom);

  //ユーザー情報取得
  useLayoutEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      //認証確認
      if (user) {
        const uid = user.uid;
        const db = getFirestore();
        const docSnap = await getDoc(doc(db, "users", uid));
        if (docSnap.data()) {
          //投票データ取得
          const voteSnap = await getDocs(query(collectionGroup(db, "votes")));
          const vote_box_idSnap = voteSnap.docs.filter(
            (item) => item.data().user_id == uid
          );

          const vote_box_id = () => {
            if (vote_box_idSnap[0]) {
              return vote_box_idSnap[0].data().box_id;
            } else {
              return "";
            }
          };
          //ユーザー情報格納
          setAuthInfo({
            id: uid,
            auth_id: docSnap.data()?.auth_id,
            name: docSnap.data()?.name,
            role: docSnap.data()?.role,
            vote: vote_box_id(),
          });
          if (path != "/admin") {
          } else {
            if (docSnap.data()?.role != 0) {
              router.push("/");
            }
          }
        }
        //auth周りのページを見えないようにする
        if (path.indexOf("/auth") != -1) {
          router.push("/");
        } else {
        }
        setLoading(false);
      }
      // ユーザー情報がない時auth周りのページを見えないようにする
      else {
        if (path == "/admin") {
          router.push("/auth/register/");
        } else {
        }
        setLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return path.indexOf("/auth") != -1 ? (
    <>
      <Layout>
        <div
          className={`${
            path != "/admin"
              ? ""
              : "md:grid grid-cols-adminLeyout grid-rows-adminLeyout"
          }`}
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
