import React from "react";

import useFormInput from "../hooks/useFormInput";
import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const NewCategory = ({ customFriendshipId }) => {
  const { addCategory } = useCategories();

  const [title, bindTitle, resetTitle] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    addCategory({ title, custom_friendship_id: customFriendshipId });
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
