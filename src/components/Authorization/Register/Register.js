//* hooks and modules
import { useState } from "react";
import {
  setUserState,
  setUserUpdateComplete,
} from "../../../features/loginState/LoginSlice";
import { useCreateUserWithEmailAndPassword } from "../../../app/firebase";
import { saveUserToFirestore } from "../../../app/usersData";

export const Register = ({
  signInWithExternalAuth,
  history,
  dispatch,
  email,
  setEmail,
  password,
  setPassword,
  ErrorOnAuthorization,
  UserExists,
  Loading,
  InputPassword,
  InputName,
  InputEmail,
  Form,
  useSelector,
  loggedInSelector,
  Auth,
  registerSucceeded,
}) => {
  const [photoURL, setPhotoURL] = useState("not available");
  const [displayName, setDisplayName] = useState("");
  const [createUserWithEmailAndPassword, userCredentials, loading, error] =
    useCreateUserWithEmailAndPassword(Auth);

  const isLoggedIn = useSelector(loggedInSelector);


  const handleRegister = async (e) => {
    e.preventDefault();
    registerSucceeded.current = false;
    dispatch(setUserUpdateComplete({ userUpdateComplete: false }));
    try {
      await createUserWithEmailAndPassword(email, password);
      /* 
      ! this will activate the "useAuthState" in App.js, causing a reRender
      ! of the App component before completing the user update, cause miss match
      ! in login.slice state. 
      */
      await Auth.currentUser.updateProfile({ displayName, photoURL });
      //* will throw error here if the user was not created successfully

      dispatch(setUserState({ email, displayName }));
      await saveUserToFirestore(Auth.currentUser);
      dispatch(setUserUpdateComplete({ userUpdateComplete: true }));
      registerSucceeded.current = true;
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (error) return <ErrorOnAuthorization error={error} />;
  if (loading || !registerSucceeded.current) return <Loading />;
  if (isLoggedIn) return <UserExists />;

  return (
    <Form
      handleSubmit={handleRegister}
      role={"Register"}
      signInWithExternalAuth={signInWithExternalAuth}>
      <InputName value={displayName} setFunction={setDisplayName} />
      <InputEmail value={email} setFunction={setEmail} />
      <InputPassword value={password} setFunction={setPassword} />
    </Form>
  );
};
