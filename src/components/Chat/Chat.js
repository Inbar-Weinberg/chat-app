import { useState } from "react";
import { createGroup, addUserToGroup } from "../../app/groupData";
import { useSelector } from "react-redux";
import { uidSelector, displayNameSelector } from "../../features/loginState/LoginSlice";
//* components
import { ActiveGroups } from "./ActiveGroups";
//* styles
import styles from "./Chat.module.scss";

const Chat = () => {
  const uid = useSelector(uidSelector);
  const displayName = useSelector(displayNameSelector);

  const [groupName, setGroupName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [groupId, setGroupId] = useState("");

  const createNewGroup = async (e) => {
    e.preventDefault();
    await createGroup({ uid, displayName, groupName, privateGroup: false });
  };

  const createPrivateGroup = async () => {
    createGroup({ uid: uid, groupName: "Some Group", privateGroup: true });
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
          <button onClick={createNewGroup}>Create New Group</button>
        </div>

        <div>
          <input
            type="text"
            placeholder="User I.D"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button onClick={createPrivateGroup}>Start New conversation</button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Group I.D"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={() => addUserToGroup({ groupId, uid })}>Join group</button>
        </div>
      </form>
    </div>
  );
};

export { Chat };
