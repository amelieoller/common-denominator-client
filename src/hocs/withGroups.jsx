import React from "react";

import { GroupContext } from "../providers/GroupProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withGroups = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <GroupContext.Consumer>
        {({ groups }) => <Component groups={groups} {...props} />}
      </GroupContext.Consumer>
    );
  };

  WrappedComponent.displayName = `WithGroups(${getDisplayName(
    WrappedComponent
  )})`;

  return WrappedComponent;
};

export default withGroups;
