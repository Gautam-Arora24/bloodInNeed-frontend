import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import authorized from "../../assets/notauthorized.png";
import { Link, useHistory } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const userDetails = JSON.parse(localStorage.getItem("user"));

  return user === undefined ? (
    <>
      {" "}
      <div className="authorization">
        {" "}
        <img src={authorized} className="authorized" alt="Authorization" />
        <h4> You must be logged in to the platform to request blood</h4>{" "}
      </div>{" "}
    </>
  ) : (
    <>
      <div className="banner">
        <h2>Welcome {userDetails.user.name}!</h2>
        <p>
          <i className="fa fa-map-marker location" aria-hidden="true"></i>{" "}
          {userDetails.user.state}, {userDetails.user.city}
        </p>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            history.push("/edit");
          }}
        >
          Edit Profile
        </button>
      </div>
      <div className="card mb-3 container">
        <div className="card-body">
          <h4 className="card-text">
            <i className="fa fa-heartbeat heart" aria-hidden="true"></i>Find
            Blood Donors
          </h4>
          <p className="card-text">
            <small className="text-muted">
              Find blood donors in your city and request them blood{" "}
            </small>
          </p>
          <Link className="find" to="/findblood">
            Find <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
