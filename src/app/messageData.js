import { Firestore } from "./firebase";

export async function createMessage({ userId, groupId, messageText }) {
  const groupRef = Firestore.collection("message");
  await groupRef.doc(groupId).set({
    createdAt: Firestore.Timestamp.now(),
    sentBy: userId,
    messageText,
  });
}
