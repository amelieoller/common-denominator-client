import React, { Component } from "react";
import styled from "styled-components/macro";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../components/Firebase";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Groups from "./Groups";
import Items from "./Items";
import CategoriesPage from "./CategoriesPage";
import { compose } from "recompose";
import Spinner from "../atoms/Spinner/Spinner";

class GroupsPage extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      groups: [],
    };
  }

  componentDidMount() {
    this.onListenForGroups();
  }

  onListenForGroups = () => {
    this.setState({ loading: true });
    console.log(this.props.authUser);

    const userId = JSON.parse(localStorage.authUser).uid;

    this.unsubscribe = this.props.firebase
      .groups()
      .where("userIds", "array-contains", userId)
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let groups = [];
          snapshot.forEach((doc) =>
            groups.push({ ...doc.data(), uid: doc.id })
          );

          this.setState({
            groups: groups.reverse(),
            loading: false,
          });
        } else {
          this.setState({ groups: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { groups, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <StyledGroupsPage>
            {loading && <Spinner />}

            {groups && !!groups.length && (
              <Switch>
                <Route
                  path={ROUTES.CATEGORIES}
                  render={(routerProps) => {
                    const groupId = routerProps.match.params.groupId;
                    const group = groups.find((g) => g.uid === groupId);

                    if (group) {
                      return (
                        <CategoriesPage
                          group={group}
                          firebase={this.props.firebase}
                          authUser={authUser}
                          {...routerProps}
                        />
                      );
                    } else {
                      this.props.history.push("groups");
                    }
                  }}
                />

                <Route
                  path={ROUTES.GROUPS}
                  render={(routerProps) => (
                    <Groups
                      groups={groups}
                      authUser={authUser}
                      {...routerProps}
                    />
                  )}
                />
              </Switch>
            )}
          </StyledGroupsPage>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const StyledGroupsPage = styled.div`
  padding: ${({ theme }) => theme.padding};
  max-width: 1400px;
  margin: 0 auto;
`;

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(GroupsPage);
