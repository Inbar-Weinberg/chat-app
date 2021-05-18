import firebase, { Firestore } from "./firebase";

export async function createMessage({ uid, groupId, messageText }) {
  const groupRef = Firestore.collection("messages");
  await groupRef.doc(groupId).set({
    createdAt: firebase.firestore.Timestamp.now(),
    sentBy: uid,
    messageText,
  });
}
