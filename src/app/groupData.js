//
import firebase, { Firestore } from "./firebase";
//import  { firestore as Firestore } from "firebase-admin";

async function createGroup({ uid, groupName, privateGroup = true, displayName }) {
  const groupRef = Firestore.collection("groups");
  let group = await groupRef.add({
    createdAt: firebase.firestore.Timestamp.now(),
    createdBy: { uid, displayName },
    name: groupName,
    privateGroup,
    lastMessage: "",
    members: [{ uid, displayName }],
    photoURL: "",//hel
  });

  const userRef = Firestore.collection("users").doc(uid);
  await userRef.update({
    groups: firebase.firestore.FieldValue.arrayUnion({ groupId: group.id, groupName }),
  });
}

async function addUserToGroup({ groupId, uid, displayName }) {
  const groupRef = Firestore.collection("groups").doc(groupId);
  await groupRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    members: firebase.firestore.FieldValue.arrayUnion({ uid, displayName }),
  });

  const groupName = await groupRef.get("name");
  console.log({ groupName });
  const userRef = Firestore.collection("users").doc(uid);
  await userRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    groups: firebase.firestore.FieldValue.arrayUnion({ groupId, groupName }),
  });
}

export { createGroup, addUserToGroup };
