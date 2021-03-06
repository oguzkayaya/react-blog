import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Nav({ token, logout }) {
  return (
    <NavbarContainer>
      <nav className="navbar navbar-expand ">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {!token ? (
              <>
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item active">
                <Link to="/" onClick={logout} className="nav-link">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </NavbarContainer>
  );
}

export default Nav;

const NavbarContainer = styled.div`
  background: var(--dark-color);
  .nav-link {
    color: #fff;
    &:hover {
      background: var(--light-color);
      color: #fff;
    }
  }
  .navbar-brand {
    color: #fff;
  }
`;
