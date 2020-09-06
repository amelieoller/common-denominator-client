import React from "react";
import PropTypes from "prop-types";

import useFormInput from "../hooks/useFormInput";
import { withRouter } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Tile from "../Tile/Tile";

const NewFriend = () => {
  const { user, addFriend } = useAuth();

  const [friendName, bindFriendName, resetFriendName] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!friendName) return;

    addFriend(user.id, friendName);

    resetFriendName();
  };

  return (
    <Tile>
      <form onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <input {...bindFriendName} type="text" placeholder="Add New Friend" />
          <button type="submit" className="pure-button">
            Add
          </button>
        </fieldset>
      </form>
    </Tile>
  );
};

NewFriend.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default withRouter(NewFriend);
