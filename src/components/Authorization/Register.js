//* hooks and modules
import { useState } from "react";

import { useCreateUserWithEmailAndPassword } from "../../app/firebase";
import { saveUserToFirestore } from "../../app/userApi";

export const Register = ({
  //* functions
  signInWithExternalAuth,
  history,
  //* local state
  email,
  setEmail,
  password,
  setPassword,
  //* refs
  pendingAuthorizationTasks,
  //*components
  ErrorOnAuthorization,
  UserExists,
  Loading,
  InputPassword,
  InputName,
  InputEmail,
  InputPhotoURL,
  Form,
  //* state management
  dispatch,
  useSelector,
  loggedInSelector,
  setUserState,
  setUserUpdateComplete,
  //* firebase
  Auth,
}) => {
  const DEFAULT_PHOTO =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg";

  const [photoURL, setPhotoURL] = useState("");
  const [errorSavingToFirestore, setErrorSavingToFirestore] = useState();
  const [displayName, setDisplayName] = useState("");
  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    errorAuthorizingUser,
  ] = useCreateUserWithEmailAndPassword(Auth);

  const isLoggedIn = useSelector(loggedInSelector);
  const handleRegister = async (e) => {
    e.preventDefault();
    pendingAuthorizationTasks.current = true;
    dispatch(setUserUpdateComplete({ userUpdateComplete: false }));
    await createUserWithEmailAndPassword(email, password);
  };

  if (isLoggedIn && !pendingAuthorizationTasks.current) return <UserExists />;

  if (userCredentials && !isLoggedIn) {
    const { user } = userCredentials;
    user
      .updateProfile({ displayName, photoURL: photoURL || DEFAULT_PHOTO })
      .then(() => saveUserToFirestore(user))
      .catch((err) => setErrorSavingToFirestore(err))

      .then(() => {
        dispatch(
          setUserState({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            photoURL: photoURL || DEFAULT_PHOTO,
          })
        );
        dispatch(setUserUpdateComplete({ userUpdateComplete: true }));
      })
      .then(() => (pendingAuthorizationTasks.current = false))
      .then(() => history.push("/"));
  }

  if (errorAuthorizingUser || errorSavingToFirestore)
    return (
      <ErrorOnAuthorization error={errorAuthorizingUser || errorSavingToFirestore} />
    );

  if (loading || pendingAuthorizationTasks.current) return <Loading />;

  if (!pendingAuthorizationTasks.current)
    return (
      <Form
        handleSubmit={handleRegister}
        role={"Register"}
        signInWithExternalAuth={signInWithExternalAuth}>
        <InputName value={displayName} setFunction={setDisplayName} />
        <InputEmail value={email} setFunction={setEmail} />
        <InputPassword value={password} setFunction={setPassword} />
        <InputPhotoURL value={photoURL} setFunction={setPhotoURL} />
      </Form>
    );
};
