import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand nav-link" to="/">
          My Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Show Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="customers/add">
                New Customer
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavBar;
