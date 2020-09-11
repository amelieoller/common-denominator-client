import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../constants/routes";
import { withFirebase } from "../components/Firebase";

const Navbar = ({ location, firebase }) => {
  const currentPath = location.pathname;
  const menuItem = "pure-menu-item";
  const selectedItem = "pure-menu-item pure-menu-selected";

  const renderMenuItem = (path) => {
    const routePath = path.split(" ").join("_").toUpperCase();

    return (
      <li
        className={currentPath === ROUTES[routePath] ? selectedItem : menuItem}
      >
        <Link to={ROUTES[routePath]} className="pure-menu-link">
          {path}
        </Link>
      </li>
    );
  };

  const renderMenuHeading = (text) => (
    <Link to="/" className="pure-menu-heading">
      {text}
    </Link>
  );

  const renderMenuButton = (buttonText, onClick) => (
    <li className={menuItem}>
      <button type="button" onClick={onClick}>
        {buttonText}
      </button>
    </li>
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
                  {renderMenuItem("Home")}
                  {renderMenuItem("Groups")}
                  {renderMenuItem("Account")}

                  {renderMenuButton("Sign Out", firebase.doSignOut)}
                </ul>
              </>
            ) : (
              <>
                {renderMenuHeading("Common Denominator")}

                <ul className="pure-menu-list">
                  {renderMenuItem("Home")}
                  {renderMenuItem("Sign In")}
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
