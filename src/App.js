import React, { useState } from "react";
import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Profile from "./components/Profile/Profile";
import FindBlood from "./components/FindBlood/FindBlood";

import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { UserContext } from "./Context/userContext";
import { setContext } from "@apollo/client/link/context";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Editprofile from "./components/EditProfile/Editprofile";
import Notifications from "./components/Notifications/Notifications";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/Footer";

export default function App() {
  const [user, setuser] = useState(getUser());
  function logoutUser() {
    localStorage.removeItem("user");
  }
  function getUser() {
    return localStorage.user;
  }

  const httpLink = createHttpLink({
    uri: "https://blood-in-need.herokuapp.com/ ",
  });
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserContext.Provider value={{ logoutUser, user, setuser }}>
          <Navbar />
          <ToastContainer />
          <Switch>
            <Route exact path="/">
              <Landing />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/signup">
              <Signup />
              <Footer />
            </Route>
            <Route path="/profile" component={Profile} />
            <PrivateRoute path="/findblood" component={FindBlood} />
            <PrivateRoute path="/edit" component={Editprofile} />
            <PrivateRoute path="/notifications" component={Notifications} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
