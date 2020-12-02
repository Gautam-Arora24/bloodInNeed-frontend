import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import "./findblood.css";
import Loading from "../Loading/Loading";
import sorry from "../../assets/sorry.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FindBlood() {
  const { loading, data, refetch } = useQuery(USERS_WITH_SAME_BLOOD);
  const [reqUser, { data1 }] = useMutation(REQ_USER);
  console.log(loading);
  console.log(data);
  useEffect(() => {
    refetch();
  }, []);
  const notify = () => {
    toast.success("🩸 Your request has been sent to the user!");
  };
  return loading ? (
    <Loading />
  ) : (
    <>
      {data && data.usersWithSameBlood.length === 0 ? (
        <>
          <Link to="/profile" className="back">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>Back
          </Link>
          <div className="sorry">
            <img src={sorry} alt="sorry" className="sorry-img" />
            <h3 className="text-center sorry-text">
              {" "}
              "Sorry, there are no donors available in your city with same blood
              group. Try changing the blood group or your location in the edit
              profile menu"
            </h3>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center heading">
            {" "}
            Donors in your city with same blood group
          </h2>
          <Link to="/profile" className="back">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>Back
          </Link>
          <table className="table table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Request Blood</th>
              </tr>
            </thead>
            <tbody>
              {data.usersWithSameBlood.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.bloodGroup}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        reqUser({
                          variables: {
                            _id: item._id,
                          },
                        });
                        notify();
                        document.querySelectorAll(".btn-danger").disabled =
                          "true";
                      }}
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
const USERS_WITH_SAME_BLOOD = gql`
  query {
    usersWithSameBlood {
      emailId
      name
      bloodGroup
      state
      city
      _id
    }
  }
`;
const REQ_USER = gql`
  mutation requestUser($_id: String) {
    requestUser(_id: $_id) {
      name
      emailId
      phoneNumber
    }
  }
`;
