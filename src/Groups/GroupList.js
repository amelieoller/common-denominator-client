import React from "react";

import GroupItem from "./GroupItem";

const GroupList = ({ authUser, groups, onEditGroup, onRemoveGroup }) => (
  <ul>
    {groups.map((group) => (
      <GroupItem
        authUser={authUser}
        key={group.uid}
        group={group}
        onEditGroup={onEditGroup}
        onRemoveGroup={onRemoveGroup}
      />
    ))}
  </ul>
);

export default GroupList;
