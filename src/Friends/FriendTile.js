import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import Tile from "../Tile/Tile";

const FriendTile = ({ friend }) => (
  <Link to={`friends/${friend.slug}`}>
    <Tile>
      <h2>{friend.username}</h2>
    </Tile>
  </Link>
);

FriendTile.propTypes = {};

export default FriendTile;
