import React from "react";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";

import Friends from "../Friends/Friends";
import FriendPage from "../FriendPage/FriendPage";

const FriendsPage = () => (
  <StyledFriendsPage>
    <Switch>
      <Route exact path="/friends" component={Friends} />
      <Route path="/friends/:slug" component={FriendPage} />
    </Switch>
  </StyledFriendsPage>
);

const StyledFriendsPage = styled.div``;

export default FriendsPage;
