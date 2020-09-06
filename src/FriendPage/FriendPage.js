import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { fetchGetFriendship } from "../api/friendship";
import Tile from "../Tile/Tile";
import NewCategory from "../NewCategory/NewCategory";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";

const FriendPage = ({ match }) => {
  const [friend, setFriend] = useState(null);
  const [customFriendshipId, setCustomFriendshipId] = useState(null);
  const [categories, setCategories] = useState(null);

  const { deleteCategory } = useCategories();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.slug.toLowerCase();
    const friend = user.friends.find((c) => c.slug === friendSlug);

    fetchGetFriendship(user.token, friend.id).then((fs) => {
      setCustomFriendshipId(fs.customFriendshipId);
      setCategories(fs.categories);
    });

    if (friend) {
      setFriend(friend);
    }
  }, [user, match.params.slug]);

  const handleDelete = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c.id !== categoryId)
    );

    deleteCategory(categoryId);
  };

  return friend ? (
    <StyledFriendPage>
      <h1>
        {friend.username} {"<>"} {user.username}
      </h1>
      {customFriendshipId && categories && (
        <>
          <h2>Shared Categories</h2>
          {categories.map((category) => (
            <Tile key={category.id}>
              <Link
                to={`/friends/${friend.username}/categories/${category.slug}`}
              >
                <span>{category.title}</span>
              </Link>
              <button
                className="pure-button"
                onClick={() => handleDelete(category.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </Tile>
          ))}

          <NewCategory customFriendshipId={customFriendshipId} />
        </>
      )}
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
