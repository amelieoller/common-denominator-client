import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import useFriendships from "../hooks/useFriendships";
import FriendCategoryPage from "../FriendCategoryPage/FriendCategoryPage";

const FriendPage = ({ match, history }) => {
  const [friend, setFriend] = useState(null);
  const [friendship, setFriendship] = useState(null);

  const { user } = useAuth();

  const { getFriendship, friendships } = useFriendships();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.slug.toLowerCase();
    const friend = user.friends.find((c) => c.slug === friendSlug);

    if (friend) setFriend(friend);

    if (friendships.length) {
      const minNum = Math.min(user.id, friend.id);
      const maxNum = Math.max(user.id, friend.id);
      const friendshipId = `${minNum}_${maxNum}`;

      const friendship = friendships.find(
        (fs) => fs.customFriendshipId === friendshipId
      );

      setFriendship(friendship);
    } else {
      getFriendship(friend.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, match.params.slug, friendships]);

  return friend ? (
    <FriendCategoryPage
      history={history}
      friend={friend}
      user={user}
      friendship={friendship}
    />
  ) : (
    "loading"
  );
};

FriendPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default FriendPage;
