//* hooks and modules
import { useState } from "react";
import {
  setUserState,
  setUserUpdateComplete,
} from "../../features/loginState/LoginSlice";
import { useCreateUserWithEmailAndPassword } from "../../app/firebase";
import { saveUserToFirestore } from "../../app/userData";

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
  uploadUserSucceeded,
}) => {
  const [photoURL, setPhotoURL] = useState("not available");
  const [errorOnUserUpload, setErrorOnUserUpload] = useState();
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
      registerSucceeded.current = true;

      dispatch(setUserState({ email, displayName }));
      await saveUserToFirestore(Auth.currentUser);
      dispatch(setUserUpdateComplete({ userUpdateComplete: true }));

      history.push("/");
    } catch (err) {
      if (registerSucceeded.current) setErrorOnUserUpload(err);
      else console.log(err);
    }
  };

  if (error || errorOnUserUpload)
    return <ErrorOnAuthorization error={error || errorOnUserUpload} />;
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
