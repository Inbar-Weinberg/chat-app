import firebase, { Firestore } from "./firebase";

async function saveUserToFirestore(user) {
  const userRef = Firestore.collection("users");
  await userRef.doc(user.uid).set({
    createdAt: firebase.firestore.Timestamp.now(),
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    groups: [],
  });
}



export { saveUserToFirestore };
