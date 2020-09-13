import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import Tile from "../Tile/Tile";
import useOutsideClick from "../hooks/useOutsideClick";

const NewTile = ({ handleAddNewItem, placeholderText, buttonText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();

  const [text, bindText, resetText] = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetText();

    if (!text || e.target.dataset.type === "discard") return;

    handleAddNewItem(text);
  };

  useOutsideClick(ref, () => {
    if (isEditing) setIsEditing(false);
  });

  return (
    <div ref={ref}>
      {isEditing ? (
        <Tile>
          <StyledNewTile onSubmit={handleSubmit} className="pure-form">
            <input
              className="sleek-input"
              placeholder={placeholderText}
              {...bindText}
              autoFocus
            ></input>

            <ButtonWrapper>
              <button type="submit" className="pure-button pure-button-primary">
                {buttonText}
              </button>
              <button
                type="submit"
                className="pure-button pure-button-primary"
                onClick={handleSubmit}
                data-type="discard"
              >
                Discard
              </button>
            </ButtonWrapper>
          </StyledNewTile>
        </Tile>
      ) : (
        <Tile addCursor onClick={() => setIsEditing(true)}>
          <AddWrapper>
            <i className="fas fa-plus"></i>
            <span>{placeholderText}</span>
          </AddWrapper>
        </Tile>
      )}
    </div>
  );
};

const ButtonWrapper = styled.div`
  button {
    margin-right: ${({ theme }) => theme.paddingSmall};
  }
`;

const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 15px;

  i {
    font-size: 28px;
    color: ${({ theme }) => theme.secondary};
  }
`;

const StyledNewTile = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  input.sleek-input {
    width: 100%;
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
