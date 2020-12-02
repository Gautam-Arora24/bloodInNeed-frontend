import React, { useContext } from "react";
import blood from "../assets/blood.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/userContext";

export default function Navbar() {
  const { logoutUser, user, setuser } = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-default navbar-static-top navbar-shrink bg-transparent">
        <div className="container">
          <div className="navbar-header page-scroll">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand page-scroll" to="/">
              <span className="title mb-0 h3">
                <img src={blood} className="blood-image" alt="Blood" />
                Blood In Need
              </span>
            </NavLink>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li className="hidden active">
                <NavLink to="#page-top">{""}</NavLink>
              </li>
              <li className="">
                <NavLink
                  className="page-scroll"
                  to="/profile"
                  activeStyle={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #c50f0f",
                  }}
                >
                  NEED BLOOD
                </NavLink>
              </li>

              {user ? (
                <>
                  <li className="">
                    <NavLink
                      className="page-scroll"
                      to="/"
                      onClick={() => {
                        logoutUser();
                        localStorage.removeItem("token");
                        setuser();
                      }}
                    >
                      LOGOUT
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink className="page-scroll" to="/notifications">
                      <i class="fa fa-bell" aria-hidden="true"></i>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <NavLink
                      className="page-scroll"
                      to="/login"
                      activeStyle={{
                        fontWeight: "bold",
                        borderBottom: "2px solid #c50f0f",
                      }}
                    >
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      className="page-scroll"
                      to="/signup"
                      activeStyle={{
                        fontWeight: "bold",
                        borderBottom: "2px solid #c50f0f",
                      }}
                    >
                      SIGNUP
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
