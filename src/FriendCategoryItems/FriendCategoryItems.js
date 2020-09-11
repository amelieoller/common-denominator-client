import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useAuth from "../hooks/useAuth";
import { fetchGetResults } from "../api/friendship";
import ItemTile from "../ItemTile/ItemTile";
import Tiles from "../Tiles/Tiles";
import Tile from "../Tile/Tile";
import useFriendships from "../hooks/useFriendships";
import useCategories from "../hooks/useCategories";
import NewTile from "../NewTile/NewTile";

const FriendCategoryItems = ({ match, history }) => {
  const [friendship, setFriendship] = useState(null);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const [result, setResult] = useState(null);
  const [friend, setFriend] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useAuth();
  const {
    getFriendship,
    friendships,
    removeCategoryItemFromFriendship,
    updateCategoryItem,
    updateCategoryItemRating,
    addCategoryItemToFriendship,
  } = useFriendships();
  const { categories } = useCategories();

  useEffect(() => {
    if (!user) return;

    const friendSlug = match.params.friend_slug.toLowerCase();
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

  const checkIfIsValid = () => {
    const numberOfVetoes = items.filter((i) => i.currentUserRating.value === 0)
      .length;
    const numItems = items.length;
    const vetoPercentage = friendship.vetoes / 100;
    const numberVetoesAvailable = Math.ceil(numItems * vetoPercentage);

    if (numberOfVetoes <= numberVetoesAvailable) {
      return true;
    } else {
      setErrorMessage("You have more vetoes than allowed.");
      return false;
    }
  };

  const handleGetResults = (categoryId) => {
    if (!checkIfIsValid()) return;

    fetchGetResults(categoryId).then(({ result }) => setResult(result));
  };

  useEffect(() => {
    if (friendship) {
      const categorySlug = match.params.category_slug.toLowerCase();
      const category = friendship.categories.find(
        (c) => c.slug === categorySlug
      );

      if (category) {
        setCategory(category);
        setItems(category.items);
      } else {
        history.push(match.url.replace(`/${match.params.category_slug}`, ""));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendship]);

  const deleteItem = (item) => {
    removeCategoryItemFromFriendship(friendship.id, item.id, category.id);
  };

  const addItem = (text) => {
    addCategoryItemToFriendship(
      friendship.id,
      { title: text, category_id: category.id },
      category.id
    );
  };

  const updateItemRating = (item, rating) => {
    updateCategoryItemRating(friendship.id, category.id, item.id, rating);
  };

  const updateItem = (newItem) => {
    updateCategoryItem(friendship.id, category.id, newItem);
  };

  return category && items ? (
    <StyledFriendCategoryItems>
      <h1 className="content-head content-head-ribbon">
        {friend.username} {"&"} {user.username}
      </h1>

      <h2 className="content-head content-head-ribbon">{category.title}</h2>

      {errorMessage}

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
              <ItemTile
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateItem={updateItem}
                updateItemRating={updateItemRating}
              >
                {item.title}
              </ItemTile>
            ))}

            <NewTile
              handleAddNewItem={addItem}
              placeholderText="Add New Item"
              buttonText="Add"
            />
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
