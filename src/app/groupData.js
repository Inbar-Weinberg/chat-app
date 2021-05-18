//
import firebase, { Firestore } from "./firebase";
//import  { firestore as Firestore } from "firebase-admin";

async function createGroup({ uid, groupName, privateGroup = true }) {
  const groupRef = Firestore.collection("groups");
  await groupRef.add({
    createdAt: firebase.firestore.Timestamp.now(),
    createdBy: uid,
    name: groupName,
    privateGroup,
    members: [uid],
    lastMessage: "",
    photoURL: "",
  });
}

async function addUserToGroup({ groupId, uid }) {
  const groupRef = Firestore.collection("groups").doc(groupId);
  await groupRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    members: firebase.firestore.FieldValue.arrayUnion(uid),
  });
  const userRef = Firestore.collection("users").doc(uid);
  await userRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    members: firebase.firestore.FieldValue.arrayUnion(uid),
  });
}

export { createGroup, addUserToGroup };
