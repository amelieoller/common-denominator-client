import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import FriendTile from "./FriendTile";
import NewFriend from "./NewFriend";
import Tiles from "../Tiles/Tiles";
import Tile from "../Tile/Tile";

const Friends = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="content-head content-head-ribbon">Friends</h1>

      <Tiles>
        {user.friends.map((friend) => (
          <FriendTile key={friend.id} friend={friend} />
        ))}

        <Link to={`categories`}>
          <Tile>
            <h2>Go Solo</h2>
          </Tile>
        </Link>

        <NewFriend />
      </Tiles>
    </>
  );
};

Friends.propTypes = {};

export default Friends;
