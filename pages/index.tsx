import { BoxList } from "../components/BoxList";

import "../utils/firebase/init";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function Home() {
  // const db = getFirestore();
  // const usersRef = collection(db, "boxes");
  // getDocs(query(usersRef)).then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     console.log(`${doc.id}: ${doc.data().name}`);
  //   });
  // });

  return <>{<BoxList />}</>;
}
