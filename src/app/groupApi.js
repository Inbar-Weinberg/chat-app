//
import firebase, { Firestore } from "./firebase";
import { addGroupToUser } from "./userApi";
//import  { firestore as Firestore } from "firebase-admin";

async function createGroup({ uid, displayName }, groupName) {
  const groupRef = Firestore.collection("groups");
  const group = await groupRef.add({
    createdAt: firebase.firestore.Timestamp.now(),
    updatedAt: firebase.firestore.Timestamp.now(),
    createdBy: { uid, displayName },
    name: groupName,
    privateGroup: false,
    lastMessage: [],
    members: [{ uid, displayName }],
    photoURL: "",
  });

  await addGroupToUser({ uid }, { groupName, groupId: group.id });
}

async function createPrivateConversation(
  { uid, displayName, photoURL = "" },
  partnersEmail
) {
  const partnerDoc = await Firestore.collection("users")
    .where("email", "==", partnersEmail)
    .get();
  const partner = partnerDoc.docs[0].data();

  console.log("file: groupApi.js ~ line 30 ~ partner", partner);

  const groupRef = Firestore.collection("groups");
  console.log("file: groupApi.js ~ line 34 ~ groupRef", groupRef);
  console.log({ photoURL });
  const group = await groupRef.add({
    createdAt: firebase.firestore.Timestamp.now(),
    updatedAt: firebase.firestore.Timestamp.now(),
    privateGroup: true,
    nameSideA: displayName,
    nameSideB: partner.displayName,
    IdSideA: uid,
    IdSideB: partner.uid,
    photoURLSideA: photoURL || "",
    photoURLSideB: partner.photoURL || "",
    lastMessage: [],
  });
  await addGroupToUser(
    { uid },
    { groupName: partner.displayName, groupId: group.id }
  );
  await addGroupToUser(
    { uid: partner.uid },
    { groupName: displayName, groupId: group.id }
  );
}

async function addUserToGroup({ uid, displayName }, { groupId }) {
  const groupRef = Firestore.collection("groups").doc(groupId);
  const group = await groupRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    members: firebase.firestore.FieldValue.arrayUnion({ uid, displayName }),
  });
  addGroupToUser({ uid, groupName: group.name, groupId });
}

export { createGroup, addUserToGroup, createPrivateConversation };
