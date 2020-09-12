import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NewTile from "../NewTile/NewTile";
import GroupSettingsTile from "./GroupSettingsTile";
import Tiles from "../Tiles/Tiles";
import Category from "./Category";
import { formatNames } from "../utils";

const Categories = ({ group, firebase, categories, history }) => {
  const [loading, setLoading] = useState(true);

  const onCreateCategory = (text) => {
    firebase.categories(group.uid).add({
      title: text,
      createdAt: firebase.fieldValue.serverTimestamp(),
    });
  };

  const groupMembers = group.users.map((user) => user.username);

  return (
    <div>
      <h1 className="content-head content-head-ribbon">
        {formatNames(groupMembers, "Categories")}
      </h1>

      <Tiles>
        {categories.map((category) => (
          <Category
            key={category.uid}
            category={category}
            history={history}
            group={group}
            firebase={firebase}
          />
        ))}
        <NewTile
          handleAddNewItem={onCreateCategory}
          placeholderText="Add New Category"
          buttonText="Add"
        />
        <GroupSettingsTile group={group} firebase={firebase} />
      </Tiles>
    </div>
  );
};

Categories.propTypes = {};

export default Categories;
