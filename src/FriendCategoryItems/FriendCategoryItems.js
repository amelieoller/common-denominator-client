import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { fetchGetCategory } from "../api/category";
import { fetchGetFriendship, fetchGetResults } from "../api/friendship";
import ItemTile from "../ItemTile/ItemTile";
import NewItem from "../NewItem/NewItem";
import Tiles from "../Tiles/Tiles";
import Tile from "../Tile/Tile";

const FriendCategoryItems = ({ match }) => {
  const [customFriendshipId, setCustomFriendshipId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const [result, setResult] = useState(null);
  const [friend, setFriend] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.friend_slug.toLowerCase();
    const foundFriend = user.friends.find((c) => c.slug === friendSlug);

    fetchGetFriendship(user.token, foundFriend.id).then((fs) => {
      setCustomFriendshipId(fs.customFriendshipId);
      setCategories(fs.categories);
    });

    setFriend(foundFriend);
  }, [
    user,
    match.params.slug,
    match.params.friend_slug,
    match.params.category_slug,
  ]);

  const handleGetResults = (categoryId) => {
    fetchGetResults(categoryId).then(({ result }) => setResult(result));
  };

  useEffect(() => {
    if (categories) {
      const categorySlug = match.params.category_slug.toLowerCase();
      const category = categories.find((c) => c.slug === categorySlug);

      fetchGetCategory(category.id).then((category) => {
        setCategory(category);
        setItems(category.items);
      });
    }
  }, [categories, customFriendshipId, match.params.category_slug]);

  return category && items ? (
    <StyledFriendCategoryItems>
      <h1 className="content-head content-head-ribbon">
        {friend.username} {"&"} {user.username}
      </h1>

      <h2 className="content-head content-head-ribbon">{category.title}</h2>

      {result ? (
        <>
          <Tile>
            <h2>{result.title}</h2>
          </Tile>

          <button
            className="pure-button button-success results-button"
            onClick={() => setResult(null)}
          >
            Reset
          </button>
        </>
      ) : (
        <>
          <Tiles>
            {items.map((item) => (
              <ItemTile key={item.id} item={item}>
                {item.title}
              </ItemTile>
            ))}

            <NewItem category={category} />
          </Tiles>

          <button
            className="pure-button button-success results-button"
            onClick={() => handleGetResults(category.id)}
          >
            Get Results
          </button>
        </>
      )}
    </StyledFriendCategoryItems>
  ) : (
    "loading"
  );
};

const StyledFriendCategoryItems = styled.div`
  .results-button {
    margin-top: 15px;
  }
`;

FriendCategoryItems.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default FriendCategoryItems;
