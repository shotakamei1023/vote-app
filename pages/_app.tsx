import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/leyout";
import { Header } from "../components/Header/Header";
import "../utils/firebase/init";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { User } from "../utils/firebase/users";

const authInfo = atom<User>({
  auth_id: "",
  name: "",
  role: "",
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
          setAuthInfo({
            auth_id: docSnap.data()?.auth_id,
            name: docSnap.data()?.name,
            role: docSnap.data()?.role,
          });
          if (path != "/admin") {
          } else {
            if (docSnap.data()?.role != 0) {
              router.push("/");
            }
          }
        }
        // ...
      } else {
        // User is signed out
        // ...
        console.log("サインアウト");
        //ログイン画面へ遷移
      }
    });
  }, []);
  return (
    <>
      <Layout>
        <div className="md:grid grid-cols-adminLeyout grid-rows-adminLeyout min-h-screen">
          <Header name={isAuthInfo.name} />
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  );
}
