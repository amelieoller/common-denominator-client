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
import useFriendships from "../hooks/useFriendships";
import useCategories from "../hooks/useCategories";

const FriendCategoryItems = ({ match, history }) => {
  const [friendship, setFriendship] = useState(null);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState(null);
  const [result, setResult] = useState(null);
  const [friend, setFriend] = useState(null);

  const { user } = useAuth();
  const { getFriendship, friendships } = useFriendships();
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

  const handleGetResults = (categoryId) => {
    fetchGetResults(categoryId).then(({ result }) => setResult(result));
  };

  useEffect(() => {
    if (categories) {
      const categorySlug = match.params.category_slug.toLowerCase();
      const category = categories.find((c) => c.slug === categorySlug);

      if (category) {
        setCategory(category);
        setItems(category.items);
      } else {
        history.push(match.url.replace(`/${match.params.category_slug}`, ""));
      }
    }
  }, [categories, history, match.params, match.url]);

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
