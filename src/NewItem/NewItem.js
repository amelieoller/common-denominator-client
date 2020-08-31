import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import { withRouter } from "react-router-dom";
import useCategories from "../hooks/useCategories";

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
    <StyledNewItem onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new item" {...bindTitle} />
    </StyledNewItem>
  );
};

const StyledNewItem = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: tomato;
  padding: ${({ theme }) => theme.padding};
  display: flex;
  align-items: flex-end;

  input {
    background: transparent;
    color: ${({ theme }) => theme.onBackground};
    border-radius: ${({ theme }) => theme.borderRadiusSmall};
    border: 1px solid;
    padding: 4px 8px;
  }

  input::placeholder {
    color: ${({ theme }) => theme.onBackground};
  }
`;

NewItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }).isRequired,
};

export default withRouter(NewItem);
