import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import Tile from "../Tile/Tile";

const NewTile = ({ handleAddNewItem, placeholderText, buttonText }) => {
  const [text, bindText, resetText] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    handleAddNewItem(text);
    resetText();
  };

  return (
    <Tile>
      <StyledNewTile onSubmit={handleSubmit} className="pure-form">
        <textarea
          className="pure-input"
          placeholder={placeholderText}
          {...bindText}
        ></textarea>

        <span>
          <button type="submit" className="pure-button pure-button-primary">
            {buttonText}
          </button>
        </span>
      </StyledNewTile>
    </Tile>
  );
};

const StyledNewTile = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  textarea {
    resize: none;
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
    border: none;
    box-shadow: none;
    background: transparent;
  }
`;

NewTile.propTypes = {
  handleAddNewItem: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default NewTile;
