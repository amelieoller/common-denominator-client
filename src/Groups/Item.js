import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useFormInput from "../hooks/useFormInput";
import Tile from "../Tile/Tile";
import ItemTile from "../ItemTile/ItemTile";

const Item = ({ item, group, category, firebase, authUser }) => {
  const handleUpdateItem = (newTitle) => {
    firebase.item(group.uid, category.uid, item.uid).update({
      title: newTitle,
      editedAt: firebase.fieldValue.serverTimestamp(),
    });
  };

  const handleUpdateItemRating = (newRating) => {
    firebase.item(group.uid, category.uid, item.uid).update({
      editedAt: firebase.fieldValue.serverTimestamp(),
      ratings: { ...item.ratings, [authUser.uid]: newRating },
    });
  };

  const handleDeleteItem = () => {
    firebase.item(group.uid, category.uid, item.uid).delete();
  };

  return (
    <ItemTile
      item={item}
      deleteItem={handleDeleteItem}
      updateItem={handleUpdateItem}
      updateItemRating={handleUpdateItemRating}
      userId={authUser.uid}
    />
  );
};

Item.propTypes = {};

export default Item;
