import firebase, { Firestore } from "./firebase";

async function saveUserToFirestore({ uid, displayName, photoURL, email }) {
  const userRef = Firestore.collection("users");
  await userRef.doc(uid).set({
    createdAt: firebase.firestore.Timestamp.now(),
    updatedAt: firebase.firestore.Timestamp.now(),
    uid: uid,
    displayName: displayName,
    photoURL: photoURL,
    email: email,
    groups: [],
  });
}

async function addGroupToUser({ uid }, { groupName, groupId }) {
  const userRef = Firestore.collection("users").doc(uid);
  await userRef.update({
    updatedAt: firebase.firestore.Timestamp.now(),
    groups: firebase.firestore.FieldValue.arrayUnion({
      groupId,
      groupName,
    }),
  });
}

export { saveUserToFirestore, addGroupToUser };
