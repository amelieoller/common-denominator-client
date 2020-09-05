import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Tile from "../Tile/Tile";

const FriendTile = ({ friend }) => (
  <Tile>
    <Link to={`friends/${friend.slug}`}>
      <span>{friend.username}</span>
    </Link>
  </Tile>
);

FriendTile.propTypes = {};

export default FriendTile;
