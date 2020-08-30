import React from "react";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useForm";

const NewCategory = () => {
  const title = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_SERVER_URL}/categories`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title.value, user_id: 2 }),
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then(({ newCategory }) => {
        console.log(newCategory);
      });
  };

  return (
    <StyledNewCategory onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new category" {...title} />
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