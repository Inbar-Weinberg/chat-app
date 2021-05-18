import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { emailSelector } from "../../features/loginState/LoginSlice";
import { Auth } from "../../app/firebase";
import { setUserState } from "../../features/loginState/LoginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setUserState({ email: undefined, displayName: undefined, uid: undefined }));
    Auth.signOut();
  };
  const email = useSelector(emailSelector);
  if (email)
    return (
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <button onClick={() => logout()}>Logout</button>
      </nav>
    );
  else
    return (
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        <div>
          <Link to="/register">Register /</Link>
          <Link to="/login"> Login</Link>
        </div>
      </nav>
    );
};
export { Navbar };
