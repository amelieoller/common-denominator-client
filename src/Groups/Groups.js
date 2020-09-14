import React, { Component } from "react";

import { withFirebase } from "../components/Firebase";
import Tiles from "../Tiles/Tiles";
import NewTile from "../NewTile/NewTile";
import GroupItem from "./GroupItem";
import Title from "../Title/Title";

class Groups extends Component {
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onCreateGroup = (text) => {
    this.props.firebase.groups().add({
      title: text,
      userIds: [this.props.authUser.uid],
      users: [
        {
          username: this.props.authUser.username,
          uid: this.props.authUser.uid,
        },
      ],
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ title: "" });
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
    const { groups, authUser } = this.props;

    return (
      <>
        <Title>
          <h1 className="content-head content-head-ribbon">Groups</h1>
        </Title>

        {!groups && <div>There are no groups ...</div>}

        <Tiles>
          {groups &&
            groups.map((group) => (
              <GroupItem
                authUser={authUser}
                key={group.uid}
                group={group}
                onEditGroup={this.onEditGroup}
                onRemoveGroup={this.onRemoveGroup}
                history={this.props.history}
              />
            ))}

          <NewTile
            handleAddNewItem={this.onCreateGroup}
            placeholderText="Add New Group"
            buttonText="Add"
          />
        </Tiles>
      </>
    );
  }
}

export default withFirebase(Groups);
