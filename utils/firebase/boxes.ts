import "./init";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";

export type Box = {
  id: string;
  name: string;
};

export async function getBoxes(): Promise<Box[]> {
  const boxes = new Array<Box>();
  const db = getFirestore();

  const boxesSnapshot = collection(db, "/boxes");
  await getDocs(query(boxesSnapshot, orderBy("name"))).then((res) => {
    res.forEach((doc) => {
      const box = doc.data() as Box;
      boxes.push({ ...box, id: doc.id });
    });
  });

  return boxes;
}
