import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { fetchGetFriendship } from "../api/friendship";
import Tile from "../Tile/Tile";
import NewCategory from "../NewCategory/NewCategory";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";
import Tiles from "../Tiles/Tiles";

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
      <h1 className="content-head content-head-ribbon">
        {friend.username} {"&"} {user.username}
      </h1>

      <h2 className="content-head content-head-ribbon">Shared Categories</h2>

      {customFriendshipId && categories && (
        <Tiles>
          {categories.map((category) => (
            <Link
              to={`/friends/${friend.username}/categories/${category.slug}`}
              key={category.id}
            >
              <Tile>
                <h2>{category.title}</h2>
                <button
                  className="pure-button button-error"
                  onClick={() => handleDelete(category.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </Tile>
            </Link>
          ))}
          <NewCategory customFriendshipId={customFriendshipId} />
        </Tiles>
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
