import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import FriendTile from "./FriendTile";
import NewFriend from "./NewFriend";

const Friends = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Friends</h1>
      <p>Select a friend you would like to find a common denominator with.</p>

      <StyledFriendList>
        {user.friends.map((friend) => (
          <FriendTile key={friend.id} friend={friend} />
        ))}

        <NewFriend />
      </StyledFriendList>
    </>
  );
};

const StyledFriendList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.padding};
`;

Friends.propTypes = {};

export default Friends;
