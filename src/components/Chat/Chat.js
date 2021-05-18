import { useState } from "react";
import { createGroup, addUserToGroup } from "../../app/groupData";
import { useSelector } from "react-redux";
import { uidSelector } from "../../features/loginState/LoginSlice";
//* components
import { ActiveGroups } from "./ActiveGroups";
//* styles
import styles from "./Chat.module.scss";

const Chat = () => {
  const uid = useSelector(uidSelector);
  const [groupId, setGroupId] = useState("");

  const createNewGroup = async () => {
    createGroup({ uid: uid, groupName: "Some Group", privateGroup: false });
  };

  const createPrivateGroup = async () => {
    createGroup({ uid: uid, groupName: "Some Group", privateGroup: true });
  };

  return (
    <div className={styles.component_wrapper}>
      <section>
        <ActiveGroups />
      </section>
      <from>
        <div>
          <input
            type="text"
            placeHolder="Group Name"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={createNewGroup}>Create New Group</button>
        </div>
        <div>
          <input
            type="text"
            placeHolder="User I.D"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={createPrivateGroup}>Start New conversation</button>
        </div>
        <div>
          <input
            type="text"
            placeHolder="Group I.D"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={() => addUserToGroup({ groupId, uid })}>Join group</button>
        </div>
      </from>
    </div>
  );
};

export { Chat };
