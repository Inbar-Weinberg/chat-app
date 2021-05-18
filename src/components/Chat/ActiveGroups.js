import React from "react";
//* state management
import { useSelector } from "react-redux";
import { uidSelector } from "../../features/loginState/LoginSlice";
//* firebase
import firebase, { Firestore, useDocumentData } from "../../app/firebase";

const ActiveGroups = () => {
  const uid = useSelector(uidSelector);
  const userRef = Firestore.collection("users").doc(uid);
  const [value, loading, error] = useDocumentData(userRef, {});
  console.log({ value });

  return (
    <div>
      hello world
      {value ? "value Exists" : "No value"}
    </div>
  );
};

export { ActiveGroups };
