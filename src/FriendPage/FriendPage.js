import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";

const FriendPage = ({ match }) => {
  const [friend, setFriend] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.slug.toLowerCase();
    const friend = user.friends.find((c) => c.slug === friendSlug);

    if (friend) {
      setFriend(friend);
    }
  }, [user, match.params.slug]);

  return friend ? (
    <StyledFriendPage>
      <h1>
        {friend.username} {"<>"} {user.username}
      </h1>
    </StyledFriendPage>
  ) : (
    "loading"
  );
};

const StyledFriendPage = styled.div``;

FriendPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default FriendPage;
