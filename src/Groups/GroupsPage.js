import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../components/Firebase";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Groups from "./Groups";
import Items from "./Items";
import CategoriesPage from "./CategoriesPage";

class GroupsPage extends Component {
  constructor(props) {
    super(props);

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
          <div>
            {loading && <div>Loading ...</div>}

            {!!groups.length && (
              <Switch>
                <Route
                  path={ROUTES.CATEGORIES}
                  render={(routerProps) => {
                    const groupId = routerProps.match.params.groupId;
                    const group = groups.find((g) => g.uid === groupId);

                    return (
                      <CategoriesPage
                        group={group}
                        firebase={this.props.firebase}
                        {...routerProps}
                      />
                    );
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
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(GroupsPage);
