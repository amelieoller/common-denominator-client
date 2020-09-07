import React from "react";

import useFormInput from "../hooks/useFormInput";
import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";
import useFriendships from "../hooks/useFriendships";

const NewCategory = ({ customFriendshipId }) => {
  const { addCategory } = useCategories();
  const { addCategoryToFriendship } = useFriendships();

  const [title, bindTitle, resetTitle] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    addCategory({ title, custom_friendship_id: customFriendshipId }).then(
      (category) => {
        if (customFriendshipId)
          addCategoryToFriendship(customFriendshipId, category);
      }
    );
    resetTitle();
  };

  return (
    <Tile>
      <form onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <input {...bindTitle} type="text" placeholder="Add New Category" />
          <button type="submit" className="pure-button">
            Add
          </button>
        </fieldset>
      </form>
    </Tile>
  );
};

NewCategory.propTypes = {};

export default NewCategory;
