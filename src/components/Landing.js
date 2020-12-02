import React from "react";
import curved from "../assets/curved.png";
import vector from "../assets/vector.png";
import { useHistory } from "react-router";
export default function Landing() {
  const history = useHistory();
  return (
    <>
      <div className="landing">
        <img className="curved" src={curved} alt="curved" />

        <div className="center">
          <h4 className="text-center"> Blood is meant to circulate</h4>
          <h1 className="text-center"> Pass it Around</h1>
          <button
            type="button"
            className="btn btn-light need-blood-btn"
            onClick={() => {
              history.push("/profile");
            }}
          >
            Need Blood?
          </button>
        </div>
      </div>
      <div className="features">
        <h2> Features of this App</h2>
        <div className="feature-body">
          <div className="image">
            <img src={vector} alt="vector" />
          </div>
          <div className="points">
            <div className="bullets">
              <h4>
                <i className="fa fa-location-arrow" aria-hidden="true"></i>
                Geo Search
              </h4>
              <p>
                {" "}
                With geo-search feature, finding blood donors has become easier
                than ever. Enter your location and you will be shown the donors
                available in the closest proximity
              </p>
            </div>
            <div className="bullets">
              <h4>
                {" "}
                <i className="fa fa-clock-o" aria-hidden="true"></i>Real Time
                Connect
              </h4>
              <p>
                No delays in receiving blood anymore. Connect with donors
                <br /> and recipients in real time
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tips" id="tips">
        <h2> Tips</h2>
        <p>
          {" "}
          Here are some tips to put your mind at ease during
          <br /> the blood donation process.
        </p>
        <div className="container">
          <div className="tips-info">
            <h4>The day before</h4>
            <hr className="horizontal" />
            <ul>
              <li>
                Have an iron-rich diet such as beans, spinach or meat poultry
              </li>
              <li>Have a proper sleep of atleast 8 hours</li>
              <li>Include more liquids in your diet</li>
            </ul>
          </div>
          <div className="tips-info">
            <h4> On the donation day</h4>
            <hr className="horizontal" />
            <ul>
              <li>
                Do carry your identify indentification forms e.g. Driver's
              </li>
              <li>Drink 2 cups of water before donating blood</li>
              <li> Avoid fast food before donation</li>
            </ul>
          </div>
          <div className="tips-info">
            <h4>After the donation</h4>
            <hr className="horizontal" />
            <ul>
              <li>
                Reward yourself with a snack immediately after donating blood
              </li>
              <li>Drink more liquids over a period of 24 hours</li>
              <li>Remove the bandage after few hours</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
