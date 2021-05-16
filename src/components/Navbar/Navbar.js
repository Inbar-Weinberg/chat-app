import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { emailSelector } from "../../features/loginState/LoginSlice";
import { Auth } from "../../app/firebase";

const Navbar = () => {
  const email = useSelector(emailSelector);
  if (email)
    return (
      <nav className={styles.navbar}>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/chat">Chat</Link>
        <button onClick={() => Auth.signOut()}>Logout</button>
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
