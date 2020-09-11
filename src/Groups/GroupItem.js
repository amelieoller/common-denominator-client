import React, { useState } from "react";
import { Link } from "react-router-dom";

const GroupItem = ({ authUser, group, onRemoveGroup, onEditGroup }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(group.title);

  const onToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(group.title);
  };

  const onChangeEditText = (event) => {
    setEditText(event.target.value);
  };

  const onSaveEditText = () => {
    onEditGroup(group, editText);

    setEditMode(false);
  };

  return (
    <li>
      {editMode ? (
        <input type="text" value={editText} onChange={onChangeEditText} />
      ) : (
        <Link to={`/groups/${group.uid}/categories`}>
          <strong>{group.userIds}</strong> {group.title}
          {group.editedAt && <span>(Edited)</span>}
        </Link>
      )}

      <span>
        {editMode ? (
          <span>
            <button onClick={onSaveEditText}>Save</button>
            <button onClick={onToggleEditMode}>Reset</button>
          </span>
        ) : (
          <button onClick={onToggleEditMode}>Edit</button>
        )}

        {!editMode && (
          <button type="button" onClick={() => onRemoveGroup(group.uid)}>
            Delete
          </button>
        )}
      </span>
    </li>
  );
};

export default GroupItem;
