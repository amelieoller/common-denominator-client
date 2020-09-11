import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { withRouter } from "react-router-dom";
import Tiles from "../Tiles/Tiles";
import Tile from "../Tile/Tile";
import NewTile from "../NewTile/NewTile";

const Friends = ({ history }) => {
  const { user, addFriend } = useAuth();

  const routeTo = (url) => {
    history.push(url);
  };

  const handleAddNewItem = (friendName) => {
    addFriend(user.id, friendName);
  };

  return (
    <>
      <h1 className="content-head content-head-ribbon">Friends</h1>

      <Tiles>
        {/* {user.friends.map((friend) => (
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

        <NewTile
          handleAddNewItem={handleAddNewItem}
          placeholderText="Add New Friend"
          buttonText="Add"
        /> */}
      </Tiles>
    </>
  );
};

Friends.propTypes = {};

export default withRouter(Friends);
