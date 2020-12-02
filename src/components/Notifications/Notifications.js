import React, { useState } from "react";
import { UserContext } from "../../Context/userContext";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./notifications.css";

export default function Notifications() {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [del_req, { data1 }] = useMutation(DEL_REQ);
  const [disabled, setdisabled] = useState([]);
  const { loading, data } = useQuery(USER_BY_ID, {
    variables: {
      _id: userDetails.user._id,
    },
    pollInterval: 5000,
  });
  return loading ? (
    <Loading />
  ) : (
    <>
      {data.userById.request.length === 0 ? (
        <h2 className="request"> No request for you as of now</h2>
      ) : (
        <>
          {data &&
            data.userById.request.map((item, index) => (
              <div className="container">
                <div className="card text-center">
                  <div className="card-body">
                    <h4 className="card-title" style={{ paddingTop: "30px" }}>
                      {item.name}
                    </h4>
                    <p className="card-text">
                      {item.name} is requesting you blood. Help them by donating
                      blood!
                    </p>
                    <a
                      href={`tel: ${item.phoneNumber}`}
                      className="btn btn-danger"
                      style={{ marginRight: "10px" }}
                    >
                      Call
                    </a>
                    <button
                      type="button"
                      key={item.emailId}
                      disabled={disabled.indexOf(item.emailId) !== -1}
                      className="btn btn-danger"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      onClick={() => {
                        del_req({
                          variables: {
                            _id: userDetails.user._id,
                            index,
                          },
                        });
                        setdisabled([...disabled, false]);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
const USER_BY_ID = gql`
  query userById($_id: String) {
    userById(_id: $_id) {
      emailId
      name
      bloodGroup
      state
      city
      phoneNumber
      _id
      request {
        _id
        name
        phoneNumber
      }
    }
  }
`;

const DEL_REQ = gql`
  mutation deleteRequest($_id: String, $index: Int) {
    deleteRequest(_id: $_id, index: $index) {
      name
      emailId
      request {
        name
        _id
        emailId
      }
    }
  }
`;
