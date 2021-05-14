import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  emailSelector,
  userLoggedInUpdate,
} from "./features/loginState/LoginSlice";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Auth, firestore } from "./app/firebase";
import { Navbar, Register } from "./components";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(Auth);

  if (user) {
    dispatch(userLoggedInUpdate({ email: user.email }));
  }

  return (
    <>
      <Navbar />
      <main>
        {user && user.email}
        <div></div>

        <Switch>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            login
          </Route>
          <Route path="/logout" exact>
            Logout
          </Route>
          <Route>NotFound</Route>
        </Switch>
      </main>
      <section>{user ? "chat room" : "sign in"}</section>
      <footer>footer</footer>
    </>
  );
}

export default App;
