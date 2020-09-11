import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Categories = ({ group, firebase, categories }) => {
  const [loading, setLoading] = useState(true);
  const [newCategoryTitle, setNewCategoryTitle] = useState(true);

  const onCreateCategory = (e, authUser) => {
    e.preventDefault();

    firebase.categories(group.uid).add({
      title: newCategoryTitle,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });
  };

  return (
    <div>
      Group Title: {group.title}
      <ul>
        {categories.map((category) => (
          <Link
            key={category.uid}
            to={`/groups/${group.uid}/categories/${category.uid}/items`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
      <form action="" onSubmit={onCreateCategory}>
        <input
          type="text"
          onChange={(e) => setNewCategoryTitle(e.target.value)}
        />
        <button onClick={onCreateCategory}>submit</button>
      </form>
    </div>
  );
};

Categories.propTypes = {};

export default Categories;
