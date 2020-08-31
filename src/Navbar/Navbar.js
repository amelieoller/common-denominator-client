import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <StyledNavbar>
      <div className="pure-menu pure-menu-horizontal pure-menu-scrollable">
        <Link to="/" className="pure-menu-link pure-menu-heading">
          Common Denominator
        </Link>

        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <Link to="/categories" className="pure-menu-link">
              Categories
            </Link>
          </li>
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
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div``;

export default Navbar;
