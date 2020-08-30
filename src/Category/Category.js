import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Category = ({ category }) => {
  return <StyledCategory>{category.attributes.title}</StyledCategory>;
};

const StyledCategory = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: tomato;
  padding: ${({ theme }) => theme.padding};
  height: 200px;
  display: flex;
  align-items: flex-end;
`;

Category.propTypes = {};

export default Category;
