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

export type Box = {
  id: string;
  name: string;
  user_id: string;
  count: string;
};

export const getBoxes = async (): Promise<Box[]> => {
  const db = getFirestore();

  //boxのデータ
  const boxesSnapShot = await getDocs(query(collection(db, "boxes"))).then(
    (res) => {
      return res.docs.map((item: any, index: number) => ({
        id: item.id,
        name: item.data().name,
        user_id: item.data().user_id,
      }));
    }
  );

  //票数のデータ
  let votesSnapShot = new Array();
  for (let i = 0; i < boxesSnapShot.length; i++) {
    let value;
    value = await getDocs(
      query(collection(db, "boxes", boxesSnapShot[i].id, "votes"))
    );
    votesSnapShot[i] = {
      box_id: value.docs[0].data().box_id,
      count: value.docs.length,
    };
  }

  //boxesとvoteをマージ
  let boxes: Box[] = [];
  for (let i = 0; i < boxesSnapShot.length; i++) {
    boxes.push({
      id: boxesSnapShot[i].id,
      name: boxesSnapShot[i].name,
      user_id: boxesSnapShot[i].user_id,
      count: votesSnapShot[i].count,
    });
  }

  //名前を昇順に並び替え
  return boxes.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
};
