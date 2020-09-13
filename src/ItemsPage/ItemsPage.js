import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Items from "../Items/Items";
import useCategories from "../hooks/useCategories";
import Spinner from "../atoms/Spinner";

const ItemsPage = ({ match }) => {
  const [category, setCategory] = useState(null);
  const { categories } = useCategories();

  useEffect(() => {
    if (!categories) return;

    const categorySlug = match.params.slug.toLowerCase();
    const category = categories.find((c) => c.slug === categorySlug);

    if (category) {
      setCategory(category);
    }
  }, [categories, match.params.slug]);

  return category && category.items ? (
    <StyledItemsPage>
      <Items category={category} />
    </StyledItemsPage>
  ) : (
    <Spinner />
  );
};

const StyledItemsPage = styled.div``;

ItemsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default ItemsPage;
