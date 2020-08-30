import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useForm";

const NewItem = ({ categoryId }) => {
  const title = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}/items`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title.value, category_id: categoryId }),
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then(({ item }) => {
        console.log(item);
      });
  };

  return (
    <StyledNewItem onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new item" {...title} />
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
  categoryId: PropTypes.number.isRequired,
};

export default NewItem;
