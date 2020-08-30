import React from "react";
import Categories from "./Categories/Categories";
import styled, { ThemeProvider } from "styled-components/macro";

import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";

const App = () => (
  <ThemeProvider theme={theme}>
    <StyledApp>
      <GlobalStyle />

      <Categories />
    </StyledApp>
  </ThemeProvider>
);

const StyledApp = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.padding};
`;

export default App;
