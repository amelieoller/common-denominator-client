import React, { Component } from "react";

import { withFirebase } from "../components/Firebase";
import GroupList from "./GroupList";

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      loading: false,
    };
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onCreateGroup = (event, authUser) => {
    this.props.firebase.groups().add({
      title: this.state.title,
      userIds: [authUser.uid],
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
      randomness: 1,
      harmony: 1,
      vetoes: 1,
    });

    this.setState({ title: "" });

    event.preventDefault();
  };

  onEditGroup = (group, title) => {
    const { uid, ...groupSnapshot } = group;

    this.props.firebase.group(group.uid).update({
      ...groupSnapshot,
      title,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveGroup = (uid) => {
    this.props.firebase.group(uid).delete();
  };

  render() {
    const { title, loading } = this.state;
    const { groups, authUser } = this.props;

    return (
      <>
        {groups && (
          <GroupList
            authUser={authUser}
            groups={groups}
            onEditGroup={this.onEditGroup}
            onRemoveGroup={this.onRemoveGroup}
          />
        )}

        {!groups && <div>There are no groups ...</div>}

        <form onSubmit={(event) => this.onCreateGroup(event, authUser)}>
          <input type="text" value={title} onChange={this.onChangeTitle} />
          <button type="submit">Create Group</button>
        </form>
      </>
    );
  }
}

export default withFirebase(Groups);
