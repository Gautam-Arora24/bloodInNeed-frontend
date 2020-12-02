import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <>
      <div className="clearfix" style={{ marginLeft: "-30px" }}>
        <ul>
          <li>
            <div className="loader three-dots">Loading...</div>
            {/* <h4 style={{ marginTop: "40px" }}>Loading</h4> */}
          </li>
        </ul>
      </div>
    </>
  );
}
