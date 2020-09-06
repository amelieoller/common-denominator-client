import React from "react";
import PropTypes from "prop-types";

import useFormInput from "../hooks/useFormInput";
import { withRouter } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const NewItem = ({ category }) => {
  const { addItem } = useCategories();

  const [title, bindTitle, resetTitle] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    addItem(category.id, { title, category_id: category.id });

    resetTitle();
  };

  return (
    <Tile>
      <form onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <input {...bindTitle} type="text" placeholder="Add New Item" />
          <button type="submit" className="pure-button">
            Add
          </button>
        </fieldset>
      </form>
    </Tile>
  );
};

NewItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default withRouter(NewItem);
