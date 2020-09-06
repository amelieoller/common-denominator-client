import React from "react";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";

import Friends from "../Friends/Friends";
import FriendPage from "../FriendPage/FriendPage";
import FriendCategoryItems from "../FriendCategoryItems/FriendCategoryItems";

const FriendsPage = () => (
  <StyledFriendsPage>
    <Switch>
      <Route exact path="/friends" component={Friends} />
      <Route
        path="/friends/:friend_slug/categories/:category_slug"
        component={FriendCategoryItems}
      />
      <Route path="/friends/:slug" component={FriendPage} />
    </Switch>
  </StyledFriendsPage>
);

const StyledFriendsPage = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default FriendsPage;
