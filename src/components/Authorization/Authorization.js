//* hooks and modules
import { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInSelector } from "../../features/loginState/LoginSlice";
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
  Form,
} from "./AuthorizationStateComponents";

export const Authorization = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerSucceeded = useRef(true);
  const uploadUserSucceeded = useRef(true);

  const signInWithExternalAuth = async ({ externalServiceName }) => {
    const provider = new firebase.auth[`${externalServiceName}AuthProvider`]();
    await Auth.signInWithPopup(provider);
    history.push("/");
  };

  const { pathname } = useLocation();
  const props = {
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
  };
  if (pathname.toLowerCase() === "/login") return <Login {...props} />;

  if (pathname.toLowerCase() === "/register") return <Register {...props} />;
  else return <></>;
};
