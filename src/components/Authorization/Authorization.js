//* hooks and modules
import { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loggedInSelector,
  setUserState,
  setUserUpdateComplete,
} from "../../features/loginState/LoginSlice";
import firebase, { Auth } from "../../app/firebase";

//* components
import { Register } from "./Register";
import { Login } from "./Login";

import {
  ErrorOnAuthorization,
  UserExists,
  Loading,
  InputPassword,
  InputName,
  InputEmail,
  InputPhotoURL,
  Form,
} from "./AuthorizationStateComponents";

export const Authorization = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pendingAuthorizationTasks = useRef(false);

  //console.log("pendingAuthorizationTasks.current", pendingAuthorizationTasks.current);

  const signInWithExternalAuth = async ({ externalServiceName }) => {
    const provider = new firebase.auth[`${externalServiceName}AuthProvider`]();
    await Auth.signInWithPopup(provider);
    history.push("/");
  };

  const { pathname } = useLocation();
  const props = {
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
  };

  if (pathname.toLowerCase() === "/login") return <Login {...props} />;

  if (pathname.toLowerCase() === "/register") return <Register {...props} />;
  else return <></>;
};
