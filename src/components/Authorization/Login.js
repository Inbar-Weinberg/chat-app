import { useSignInWithEmailAndPassword } from "../../app/firebase";

export const Login = ({
  signInWithExternalAuth,
  history,
  email,
  setEmail,
  password,
  setPassword,
  ErrorOnAuthorization,
  UserExists,
  Loading,
  InputPassword,
  InputEmail,
  Form,
  useSelector,
  loggedInSelector,
  Auth,
  registerSucceeded,
}) => {
  const [signInWithEmailAndPassword, userCredentials, loading, error] =
    useSignInWithEmailAndPassword(Auth);

  const isLoggedIn = useSelector(loggedInSelector);

  const handleLogin = async (e) => {
    e.preventDefault();
    registerSucceeded.current = false;
    try {
      await signInWithEmailAndPassword(email, password);
      console.log(Auth.currentUser);
      if (Auth.currentUser) {
        registerSucceeded.current = true;
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (error) return <ErrorOnAuthorization error={error} />;
  if (loading || !registerSucceeded.current) return <Loading />;
  if (isLoggedIn) return <UserExists />;

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
