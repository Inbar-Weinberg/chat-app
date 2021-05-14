import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useSelector, useDispatch } from "react-redux";

import { Auth } from "../../app/firebase";
import styles from "./Register.module.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, userCredentials, loading, error] =
    useCreateUserWithEmailAndPassword(Auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (userCredentials) {
    return (
      <div>
        <p>Registered User: {userCredentials.user.email}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.register}>
        <div>
          <button className={styles.register.signInBtn}>
            Sign up with Email and Password
          </button>
          <button className={styles.signInBtn}>Sign up with Google</button>
          <button className={styles.signInBtn}>Sign up with Facebook</button>
        </div>
        <form className={styles.register_form}>
          <input
            type="email"
            className={styles.register_input}
            placeholder="Email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.register_input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => createUserWithEmailAndPassword(email, password)}
            className={styles.register_submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export {Register};
