import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components/macro";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../constants/routes";
import { withFirebase } from "../components/Firebase";

const StyledMenuItem = styled.li``;

const ButtonWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  line-height: 18px;

  i {
    font-size: 21px;
  }
`;

const Navbar = ({ location, firebase }) => {
  const currentPath = location.pathname;
  const menuItem = "pure-menu-item";
  const selectedItem = "pure-menu-item pure-menu-selected";

  const MenuItem = ({ children, path, onClick }) => {
    const routePath = path.split(" ").join("_").toUpperCase();

    return (
      <StyledMenuItem
        className={currentPath === ROUTES[routePath] ? selectedItem : menuItem}
        onClick={onClick}
      >
        <ButtonWrapper to={ROUTES[routePath]} className="pure-menu-link">
          {children}
        </ButtonWrapper>
      </StyledMenuItem>
    );
  };

  const renderMenuHeading = (text) => (
    <Link to="/groups" className="pure-menu-heading">
      {text}
    </Link>
  );

  return (
    <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal">
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <>
                {renderMenuHeading(`Hi ${authUser.username}!`)}

                <ul className="pure-menu-list">
                  <MenuItem path="Groups">
                    <i className="fas fa-users"></i>
                    <span>Groups</span>
                  </MenuItem>

                  <MenuItem path="Account">
                    <i className="fas fa-cog"></i>
                    <span>Account</span>
                  </MenuItem>

                  <MenuItem path="Sign In" onClick={firebase.doSignOut}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign Out</span>
                  </MenuItem>
                </ul>
              </>
            ) : (
              <>
                {renderMenuHeading("Common Denominator")}

                <ul className="pure-menu-list">
                  <MenuItem path="Sign In">
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Sign In</span>
                  </MenuItem>
                </ul>
              </>
            )
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  );
};

export default compose(withRouter, withFirebase)(Navbar);
