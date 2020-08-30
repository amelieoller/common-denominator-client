import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Items from "../Items/Items";

const ItemsPage = ({ match }) => {
  const [items, setItems] = useState(null);
  const categorySlug = match.params.slug.toLowerCase();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/categories/${categorySlug}/items`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          setItems([]);
        } else {
          setItems(data);
        }
      });
  }, [categorySlug]);

  return items ? (
    <StyledItemsPage>
      <Items items={items} />
    </StyledItemsPage>
  ) : (
    "loading"
  );
};

const StyledItemsPage = styled.div``;

ItemsPage.propTypes = {};

export default ItemsPage;
