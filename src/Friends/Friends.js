import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { withRouter } from "react-router-dom";
import NewFriend from "./NewFriend";
import Tiles from "../Tiles/Tiles";
import Tile from "../Tile/Tile";

const Friends = ({ history }) => {
  const { user } = useAuth();

  const routeTo = (url) => {
    history.push(url);
  };

  return (
    <>
      <h1 className="content-head content-head-ribbon">Friends</h1>

      <Tiles>
        {user.friends.map((friend) => (
          <Tile
            isLinkable
            onClick={() => routeTo(`friends/${friend.slug}`)}
            key={friend.id}
          >
            <h2>{friend.username}</h2>
          </Tile>
        ))}

        <Tile isLinkable onClick={() => routeTo("categories")}>
          <h2>Go Solo</h2>
        </Tile>

        <NewFriend />
      </Tiles>
    </>
  );
};

Friends.propTypes = {};

export default withRouter(Friends);
