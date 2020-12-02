import React, { useState, useContext } from "react";
import donation2 from "../../assets/donation2.jpg";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import gql from "graphql-tag";
import Loading from "../Loading/Loading";
import { UserContext } from "../../Context/userContext";
import { Link } from "react-router-dom";
export default function Login() {
  const { setuser } = useContext(UserContext);
  const history = useHistory();
  const [userdetails, setuserdetails] = useState({
    emailId: "",
    password: "",
  });
  const [login_user, { loading, error, data }] = useMutation(USER_LOGIN);
  const [errors, seterrors] = useState([]);
  const { emailId, password } = userdetails;
  const handleChange = (name) => (event) => {
    setuserdetails({ ...userdetails, [name]: event.target.value }); //TAKE A LOOK
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login_user({
      variables: {
        emailId,
        password,
      },
    })
      .then((res) => {
        seterrors([]);
      })
      .catch((err) => {
        seterrors([err.message]);
      });
  };

  // if (error) {
  //   console.log(error);
  //   seterrors([error.message]);
  // }
  if (data) {
    console.log("~~~", data);
    localStorage.setItem("user", JSON.stringify(data.userLogin));
    localStorage.setItem("token", data.userLogin.token);
    setuser(localStorage);
    history.push("/profile");
  }

  return (
    <div className="SignUp">
      <div className="left-bar">
        <div className="top">
          <div>
            <div className="logo">
              <h2>Blood In Need</h2>
            </div>
          </div>
          <p>Login to become a part of this journey</p>
        </div>
        <img className="art" src={donation2} alt="Donation" />
      </div>
      <div className="main-signup">
        <h1>Login</h1>
        <div className="signup-form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={emailId}
            onChange={handleChange("emailId")}
          />

          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            value={password}
            onChange={handleChange("password")}
          />

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSubmit}
          >
            Login{" "}
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
          </button>
          <h5 style={{ marginTop: "20px" }}>
            {" "}
            No Account. <Link to="/signup">Signup</Link>
          </h5>
          {loading && <Loading />}
          {errors &&
            errors.map((item, index) => (
              <div className="alert alert-danger" role="alert">
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const USER_LOGIN = gql`
  mutation userLogin($emailId: String, $password: String) {
    userLogin(emailId: $emailId, password: $password) {
      user {
        _id
        name
        bloodGroup
        emailId
        phoneNumber
        state
        city
        request {
          _id
          name
          phoneNumber
        }
      }
      token
    }
  }
`;
