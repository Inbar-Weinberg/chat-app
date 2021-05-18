import React from "react";
//* state management
import { useSelector } from "react-redux";
import { uidSelector } from "../../features/loginState/LoginSlice";
//* firebase
import firebase, { Firestore, useDocumentData } from "../../app/firebase";

const ActiveGroups = () => {
  const uid = useSelector(uidSelector);
  const userRef = Firestore.collection("users").doc(uid);
  const [value, loading, error] = useDocumentData(userRef);

  if (value)
    return (
      <div>
        {value.groups.map((group, i) => (
          <div key={group.groupId || i}>{group.name}</div>
        ))}
      </div>
    );

  return (
    <div>
      {loading && "Loading"}
      {error && error.message}
    </div>
  );
};

export { ActiveGroups };
