import { useSignInWithEmailAndPassword } from "../../app/firebase";

export const Login = ({
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
  InputEmail,
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
  const [signInWithEmailAndPassword, userCredentials, loading, errorAuthorizingUser] =
    useSignInWithEmailAndPassword(Auth);

  const isLoggedIn = useSelector(loggedInSelector);
  const handleLogin = async (e) => {
    e.preventDefault();
    pendingAuthorizationTasks.current = true;
    dispatch(setUserUpdateComplete({ userUpdateComplete: false }));
    await signInWithEmailAndPassword(email, password);
  };

  if (isLoggedIn && !pendingAuthorizationTasks.current) return <UserExists />;

  if (userCredentials && !isLoggedIn) {
    const { user } = userCredentials;
    console.log(user);
    dispatch(
      setUserState({ email: user.email, displayName: user.displayName, uid: user.uid })
    );
    dispatch(setUserUpdateComplete({ userUpdateComplete: true }));
    pendingAuthorizationTasks.current = false;
    history.push("/");
  }

  if (errorAuthorizingUser) return <ErrorOnAuthorization error={errorAuthorizingUser} />;
  if (loading || pendingAuthorizationTasks.current) return <Loading />;

  if (!pendingAuthorizationTasks.current)
    return (
      <Form
        handleSubmit={handleLogin}
        role={"Login"}
        signInWithExternalAuth={signInWithExternalAuth}>
        <InputEmail value={email} setFunction={setEmail} />
        <InputPassword value={password} setFunction={setPassword} />
      </Form>
    );
};
