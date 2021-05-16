import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { emailSelector } from "../../features/loginState/LoginSlice";
import firebase, { Auth, useCreateUserWithEmailAndPassword } from "../../app/firebase";
import styles from "./Register.module.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, userCredentials, loading, error] =
    useCreateUserWithEmailAndPassword(Auth);

  const history = useHistory();
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(email, password);
      await Auth.currentUser.updateProfile({ displayName: name });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
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
      <div className={styles.register}>
        <div>
          <button className={styles.register.signInBtn} disabled>
            Sign up
          </button>{" "}
          <Link to="/login">
            <button className={styles.register.signInBtn}>Login</button>
          </Link>
        </div>
        <form className={styles.register_form}>
          <input
            type="text"
            className={styles.register_input}
            placeholder="Name"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className={styles.register_input}
            placeholder="Email@domain.com"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.register_input}
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
          <button onClick={handleRegister} className={styles.register_submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { Register };
