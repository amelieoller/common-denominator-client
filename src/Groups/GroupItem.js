import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tile from "../Tile/Tile";
import { formatNames } from "../utils";

const GroupItem = ({
  authUser,
  group,
  onRemoveGroup,
  onEditGroup,
  history,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(group.title);

  const onToggleEditMode = (e) => {
    e.stopPropagation();
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

  const routeTo = () => {
    history.push(`/groups/${group.uid}/categories`);
  };

  const groupMembers = group.users.map((user) => user.username);

  return (
    <Tile isLinkable onClick={() => routeTo()}>
      {editMode ? (
        <input type="text" value={editText} onChange={onChangeEditText} />
      ) : (
        <h2>{formatNames(groupMembers)}</h2>
      )}

      <span>
        {editMode ? (
          <span>
            <button onClick={onSaveEditText} className="pure-button">
              Save
            </button>
            <button onClick={onToggleEditMode} className="pure-button">
              Reset
            </button>
          </span>
        ) : (
          <button onClick={onToggleEditMode} className="pure-button ">
            <i className="fas fa-edit"></i>
          </button>
        )}

        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveGroup(group.uid)}
            className="pure-button button-error"
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </span>
    </Tile>
  );
};

export default GroupItem;
