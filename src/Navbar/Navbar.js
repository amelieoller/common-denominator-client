import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <Link to="/" className="pure-menu-heading">
          {user ? `Hi ${user.username}!` : "Common Denominator"}
        </Link>

        <ul className="pure-menu-list">
          {user && (
            <>
              {/* <li className="pure-menu-item">
                <Link to="/categories" className="pure-menu-link">
                  Categories
                </Link>
              </li> */}

              <li className="pure-menu-item pure-menu-selected">
                <Link to="/friends" className="pure-menu-link">
                  Friends
                </Link>
              </li>
            </>
          )}

          <li className="pure-menu-item">
            {user ? (
              <Link to="/" className="pure-menu-link" onClick={logout}>
                Logout
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

export default Navbar;
