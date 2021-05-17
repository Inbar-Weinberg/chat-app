import { Firestore } from "./firebase";

async function saveUserToFirestore(user) {

  const userRef = Firestore.collection("user");
  await userRef.doc(user.uid).set({
    createdAt: Firestore.Timestamp.now(),
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    groups: [],
  });
}

export { saveUserToFirestore };

//admin.firestore.Timestamp.fromDate(new Date('December 10, 1815'))
