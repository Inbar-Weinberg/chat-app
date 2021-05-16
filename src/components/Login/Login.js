import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { emailSelector } from "../../features/loginState/LoginSlice";
import firebase, { Auth, useSignInWithEmailAndPassword } from "../../app/firebase";
import styles from "./Login.module.scss";

const Login = () => {
  const [attemptedLogin, setAttemptedLogin] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, userCredentials, loading, error] =
    useSignInWithEmailAndPassword(Auth);
  const history = useHistory();

  const handleLogin = () => {
    signInWithEmailAndPassword(email, password);
    setAttemptedLogin(true);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    Auth.signInWithPopup(provider);
  };
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    Auth.signInWithPopup(provider);
  };

  if (useSelector(emailSelector)) {
    if (attemptedLogin) history.push("/");
    return (
      <>
        <h3>There is all ready a user registered</h3>
        <h4>If you want to create a new user you must log out first</h4>
      </>
    );
  }

  if (error) {
    console.log("Error on registration: ", error);
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => history.go(0)}>Retry</button>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.login}>
        <div>
          <Link to="/register">
            <button className={styles.login.signInBtn}>Sign up</button>
          </Link>
          <button className={styles.login.signInBtn} disabled>
            Login
          </button>
        </div>
        <form className={styles.login_form}>
          <input
            type="email"
            className={styles.login_input}
            placeholder="Email@domain.com"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.login_input}
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button className={styles.signInBtn} onClick={signInWithGoogle}>
              Sign up with Google
            </button>
            <button className={styles.signInBtn} onClick={signInWithFacebook}>
              Sign up with Facebook
            </button>
          </div>
          <button onClick={handleLogin} className={styles.login_submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { Login };
