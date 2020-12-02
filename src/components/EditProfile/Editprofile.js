import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import donation from "../../assets/donation.jpg";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import indianCities from "indian-cities-database";
import { UserContext } from "../../Context/userContext";
import Loading from "../Loading/Loading";
const uniqueStates = [...new Set(indianCities.cities.map((obj) => obj.state))];

function EditProfile() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const info = JSON.parse(localStorage.getItem("user"));
  const [userdetails, setuserdetails] = useState({
    bloodGroup: info.user.bloodGroup,
    state: info.user.state,
    city: info.user.city,
  });
  const [cities, setcities] = useState([]);
  const [errors, seterrors] = useState([]);

  const [updateUser, { loading, data, error }] = useMutation(UPDATE_USER);
  const { bloodGroup, state, city } = userdetails;

  useEffect(() => {
    var cities = indianCities.cities.filter((item) => item.state === state);
    setcities(cities);
  }, [state]);

  const handleChange = (name) => (event) => {
    setuserdetails({ ...userdetails, [name]: event.target.value }); //TAKE A LOOK
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        bloodGroup,
        state,
        city,
      },
    });
  };
  if (data) {
    localStorage.removeItem("user");
    console.log(state, city, bloodGroup);
    if (state !== "") {
      info.user.state = state;
    }
    if (bloodGroup !== "") {
      info.user.bloodGroup = bloodGroup;
    }
    if (city !== "") {
      info.user.city = city;
    }
    localStorage.setItem("user", JSON.stringify(info));
    history.push("/profile");
  }
  return (
    <>
      <div className="SignUp">
        <div className="left-bar">
          <div className="top">
            <div>
              <div className="logo">
                <h2>Edit Your Profile</h2>
              </div>
            </div>
          </div>
          <img className="art" src={donation} alt="Donation" />
        </div>
        <div className="main-signup">
          <h1>Edit</h1>
          <div className="signup-form">
            <label htmlFor="blood_group">Blood group</label>
            <select
              name="blood_grp"
              value={bloodGroup}
              onChange={handleChange("bloodGroup")}
            >
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <label htmlFor="address">State</label>
            <select name="state" value={state} onChange={handleChange("state")}>
              {uniqueStates.map((item, index) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <label htmlFor="address">City</label>
            <select name="city" value={city} onChange={handleChange("city")}>
              {cities.map((item) => (
                <option value={item.city}>{item.city}</option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSubmit}
            >
              Edit{" "}
              <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>

            {errors &&
              errors.map((item, index) => (
                <div key={index} className="alert alert-danger" role="alert">
                  {item}
                </div>
              ))}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </>
  );
}
const UPDATE_USER = gql`
  mutation updateUser($bloodGroup: String, $state: String, $city: String) {
    updateUser(bloodGroup: $bloodGroup, state: $state, city: $city) {
      name
      emailId
      phoneNumber
      state
      city
      bloodGroup
    }
  }
`;
export default EditProfile;
