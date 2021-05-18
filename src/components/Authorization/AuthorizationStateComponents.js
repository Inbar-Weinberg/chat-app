//* hooks and modules
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Authorization.module.scss";

export const UserExists = () => {
  return (
    <>
      <h3>There is all ready a user registered</h3>
      <h4>If you want to create a new user you must log out first</h4>
    </>
  );
};

export const ErrorOnAuthorization = ({ error }) => {
  const history = useHistory();
  console.log("Error on registration: ", error);

  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => history.go(0)}>Retry</button>
    </div>
  );
};

export const Loading = () => {
  return <p>Loading...</p>;
};

export const Form = ({
  children,
  handleSubmit,
  role = `Register`,
  signInWithExternalAuth,
}) => {
  return (
    <div className={styles.component_body}>
      <div>
        <Link to="/Register">
          <button className={styles.methodBtn} disabled={role === "Register"}>
            Register
          </button>
        </Link>
        <Link to="/Login">
          <button className={styles.methodBtn} disabled={!(role === "Register")}>
            Login
          </button>
        </Link>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {children}
        <div>
          <button
            className={styles.signInBtn}
            onClick={() => signInWithExternalAuth({ externalServiceName: `Google` })}>
            Sign up with Google
          </button>
          <button
            className={styles.signInBtn}
            onClick={() => signInWithExternalAuth({ externalServiceName: `Facebook` })}>
            Sign up with Facebook
          </button>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export const InputPassword = ({ value, setFunction }) => {
  return (
    <input
      className={styles.input}
      type="password"
      placeholder="Password"
      autoComplete="current-password"
      required
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};

export const InputName = ({ value, setFunction }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="User Name"
      autoComplete="name"
      required
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};

export const InputEmail = ({ value, setFunction }) => {
  return (
    <input
      className={styles.input}
      type="email"
      placeholder="Email@domain.com"
      autoComplete="email"
      required
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};

export const InputPhotoURL = ({ value, setFunction }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Photo URL"
      autoComplete="Photo URL"
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};
