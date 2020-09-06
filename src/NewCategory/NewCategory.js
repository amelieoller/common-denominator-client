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
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add new category" {...bindTitle} />
      </form>
    </Tile>
  );
};

NewCategory.propTypes = {};

export default NewCategory;
