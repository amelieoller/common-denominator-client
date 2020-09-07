import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import Tile from "../Tile/Tile";
import Tiles from "../Tiles/Tiles";
import NewCategory from "../NewCategory/NewCategory";
import useCategories from "../hooks/useCategories";
import useFriendships from "../hooks/useFriendships";
import SettingsPage from "../SettingsPage/SettingsPage";

const FriendCategoryPage = ({ history, friend, user, friendship }) => {
  const { deleteCategory } = useCategories();
  const { removeCategoryFromFriendship } = useFriendships();

  const handleDelete = (e, categoryId) => {
    e.stopPropagation();

    deleteCategory(categoryId);
    removeCategoryFromFriendship(friendship.customFriendshipId, categoryId);
  };

  const routeTo = (category) => {
    history.push(`/friends/${friend.username}/categories/${category.slug}`);
  };

  return (
    <StyledFriendPage>
      <h1 className="content-head content-head-ribbon">
        {friend.username} {"&"} {user.username}
      </h1>

      <h2 className="content-head content-head-ribbon">Shared Categories</h2>

      {friendship && (
        <Tiles>
          {friendship.categories.map((category) => (
            <Tile
              isLinkable
              onClick={() => routeTo(category)}
              key={category.id}
            >
              <h2>{category.title}</h2>
              <button
                className="pure-button button-error"
                onClick={(e) => handleDelete(e, category.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </Tile>
          ))}
          <NewCategory customFriendshipId={friendship.customFriendshipId} />

          <SettingsPage
            friendshipId={friendship.id}
            friendshipHarmony={friendship.harmony}
            friendshipRandomness={friendship.randomness}
          />
        </Tiles>
      )}
    </StyledFriendPage>
  );
};

const StyledFriendPage = styled.div``;

FriendCategoryPage.propTypes = {};

export default FriendCategoryPage;
