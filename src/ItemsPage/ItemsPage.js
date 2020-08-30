import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Items from "../Items/Items";

const ItemsPage = ({ categoryId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}/items`)
      .then((resp) => resp.json())
      .then((data) => setItems(data));
  }, [categoryId]);

  return items.length ? (
    <StyledItemsPage>
      <Items categoryId={categoryId} items={items} />
    </StyledItemsPage>
  ) : (
    "loading"
  );
};

const StyledItemsPage = styled.div``;

ItemsPage.propTypes = {};

export default ItemsPage;
