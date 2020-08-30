import React, { useState } from "react";
import PropTypes from "prop-types";
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

const StyledNewCategory = styled.form``;

NewCategory.propTypes = {};

export default NewCategory;
