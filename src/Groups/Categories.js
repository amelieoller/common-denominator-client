import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import NewTile from "../NewTile/NewTile";
import GroupSettingsTile from "./GroupSettingsTile";
import Tiles from "../Tiles/Tiles";
import Category from "./Category";
import { formatNames } from "../utils";
import Title from "../Title/Title";

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
      <Title backButtonText="Groups" backLink="/groups">
        <h1 className="content-head content-head-ribbon">
          {formatNames(groupMembers, "Categories")}
        </h1>
      </Title>

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
