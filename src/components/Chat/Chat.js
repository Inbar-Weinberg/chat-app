import { useState } from "react";
import { useSelector } from "react-redux";
import {
  uidSelector,
  displayNameSelector,
  photoURLSelector,
} from "../../features/loginState/LoginSlice";
//* Data base Api
import {
  createGroup,
  addUserToGroup,
  createPrivateConversation,
} from "../../app/groupApi";
//* components
import { ActiveGroups } from "./ActiveGroups";
//* styles
import styles from "./Chat.module.scss";

const Chat = () => {
  const uid = useSelector(uidSelector);
  const displayName = useSelector(displayNameSelector);
  const photoURL = useSelector(photoURLSelector);

  const [groupName, setGroupName] = useState("");
  const [partnersEmail, setPartnersEmail] = useState("");
  const [groupId, setGroupId] = useState("");

  const createGroupHandler = async (e) => {
    e.preventDefault();
    await createGroup({ uid, displayName }, groupName);
  };

  const createPrivateConversationHandler = async (e) => {
    e.preventDefault();
    await createPrivateConversation({ uid, displayName, photoURL }, partnersEmail);
  };

  return (
    <div className={styles.component_body}>
      <section>
        <ActiveGroups />
      </section>
      <form>
        <div>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={createGroupHandler}>Create New Group</button>
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="User Email"
            value={partnersEmail}
            onChange={(e) => setPartnersEmail(e.target.value)}
          />
          <button onClick={createPrivateConversationHandler}>
            Start New conversation
          </button>
        </div>
        <br />

        <div>
          <input
            type="text"
            placeholder="Group I.D"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={() => addUserToGroup({ groupId, uid })}>
            Join group
          </button>
        </div>
      </form>
    </div>
  );
};

export { Chat };
