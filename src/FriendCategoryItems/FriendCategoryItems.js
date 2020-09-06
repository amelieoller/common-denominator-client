import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { fetchGetCategory } from "../api/category";
import { fetchGetFriendship, fetchGetResults } from "../api/friendship";
import ItemTile from "../ItemTile/ItemTile";
import NewItem from "../NewItem/NewItem";

const FriendCategoryItems = ({ match }) => {
  const [customFriendshipId, setCustomFriendshipId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const [result, setResult] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.friend_slug.toLowerCase();
    const foundFriend = user.friends.find((c) => c.slug === friendSlug);

    fetchGetFriendship(user.token, foundFriend.id).then((fs) => {
      setCustomFriendshipId(fs.customFriendshipId);
      setCategories(fs.categories);
    });
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
      <h1>{category.title}</h1>

      {items.map((item) => (
        <ItemTile key={item.id} item={item}>
          {item.title}
        </ItemTile>
      ))}

      <NewItem category={category} />

      <button onClick={() => handleGetResults(category.id)}>Get Results</button>

      {result && <div>{result.title}</div>}
    </StyledFriendCategoryItems>
  ) : (
    "loading"
  );
};

const StyledFriendCategoryItems = styled.div``;

FriendCategoryItems.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default FriendCategoryItems;
