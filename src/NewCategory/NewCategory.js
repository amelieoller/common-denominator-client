import React from "react";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import useCategories from "../hooks/useCategories";

const NewCategory = () => {
  const { addCategory } = useCategories();

  const [title, bindTitle, resetTitle] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    addCategory({ title, user_id: 2 });
    resetTitle();
  };

  return (
    <StyledNewCategory onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new category" {...bindTitle} />
    </StyledNewCategory>
  );
};

const StyledNewCategory = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: tomato;
  padding: ${({ theme }) => theme.padding};
  height: 200px;
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

NewCategory.propTypes = {};

export default NewCategory;
