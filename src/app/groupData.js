//
import firebase,{ Firestore }  from "./firebase";
//import  { firestore as Firestore } from "firebase-admin";

export async function createGroup({ userId, groupName, privateGroup = true }) {
  const groupRef = Firestore.collection("groups");
  console.log(Firestore);
  console.log(Object.keys(Firestore));
  await groupRef.add({
    createdAt: Firestore.Timestamp.now(),
    createdBy: userId,
    name: groupName,
    privateGroup,
    members: [userId],
    lastMessage: "",
    photoURL: "",
  });
}
