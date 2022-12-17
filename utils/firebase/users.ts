import "./init";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  getCountFromServer,
  collectionGroup,
  where,
  doc,
} from "firebase/firestore";
import { rejects } from "assert";

export type User = {
  id: string | undefined;
  auth_id: string | undefined;
  name: string | undefined;
  role: number | undefined;
  vote?: boolean;
};

export const getUsers = async (): Promise<User[]> => {
  const db = getFirestore();

  //boxのデータ
  const users = await getDocs(query(collection(db, "users"))).then((res) => {
    return res.docs.map((item: any, index: number) => ({
      id: item.id,
      auth_id: item.data().auth_id,
      name: item.data().name,
      role: item.data().role,
    }));
  });

  //名前を昇順に並び替え
  return users;
};
