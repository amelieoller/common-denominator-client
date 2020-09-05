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
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add new friend" {...bindFriendName} />
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
