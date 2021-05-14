import React from "react";
import styles from "./Navbar.module.scss";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/logout">Logout</Link>
      <Link to="/register">Register</Link>
      <Link to="/Login">Login</Link>
    </nav>
  );
};
export { Navbar };
