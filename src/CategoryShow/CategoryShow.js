import React from "react";
import PropTypes from "prop-types";

import ItemsPage from "../ItemsPage/ItemsPage";

const CategoryShow = ({ category }) => <ItemsPage categoryId={category.id} />;

CategoryShow.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        currentUserRating: PropTypes.shape({
          id: PropTypes.number.isRequired,
          value: PropTypes.number.isRequired,
        }),
      })
    ).isRequired,
  }),
};

export default CategoryShow;
