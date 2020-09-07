import React from "react";
import styled from "styled-components/macro";
import { Link, withRouter } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = ({ location }) => {
  const { user, logout } = useAuth();

  const path = location.pathname.split("/")[1];

  return (
    <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <Link to="/" className="pure-menu-heading">
          {user ? `Hi ${user.username}!` : "Common Denominator"}
        </Link>

        <ul className="pure-menu-list">
          {user && (
            <>
              <li
                className={
                  path === "friends"
                    ? "pure-menu-item pure-menu-selected"
                    : "pure-menu-item"
                }
              >
                <Link to="/friends" className="pure-menu-link">
                  Friends
                </Link>
              </li>

              <li
                className={
                  path === "categories"
                    ? "pure-menu-item pure-menu-selected"
                    : "pure-menu-item"
                }
              >
                <Link to="/categories" className="pure-menu-link">
                  Go Solo
                </Link>
              </li>

              <li
                className={
                  path === "settings"
                    ? "pure-menu-item pure-menu-selected"
                    : "pure-menu-item"
                }
              >
                <Link to="/settings" className="pure-menu-link">
                  <i className="fas fa-cog"></i>
                </Link>
              </li>
            </>
          )}

          <li className="pure-menu-item">
            {user ? (
              <Link to="/" className="pure-menu-link" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            ) : (
              <Link to="/" className="pure-menu-link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const StyledNavbar = styled.div``;

export default withRouter(Navbar);
