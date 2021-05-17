import { Route, Switch } from "react-router-dom";
import { Auth, useAuthState } from "./app/firebase";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserState,
  userUpdateCompleteSelector,
  displayNameSelector,
} from "./features/loginState/LoginSlice";

import { Navbar, Register, Login, Authorization } from "./components";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(Auth);
  const displayName = useSelector(displayNameSelector);
  const userUpdateComplete = useSelector(userUpdateCompleteSelector);
  if (userUpdateComplete && user) {
    dispatch(setUserState({ email: user.email, displayName: user.displayName }));
    return (
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <span>Hello {displayName}</span>
            </Route>
            <Route path="/chat" exact>
              <div>chat</div>
            </Route>
            <Route path="/register" exact>
              <Authorization />
            </Route>
            <Route path="/login" exact>
              <Authorization />
            </Route>
            <Route>
              <p>404</p>
              <p>Page NotFound</p>
            </Route>
          </Switch>
        </main>
        <footer>footer</footer>
      </>
    );
  } else {
    dispatch(setUserState({ email: undefined, displayName: undefined }));
    return (
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              Home
            </Route>
            <Route path="/register" exact>
              <Authorization />
            </Route>
            <Route path="/login" exact>
              <Authorization />
            </Route>
            <Route>
              <p>404</p>
              <p>Page NotFound</p>
            </Route>
          </Switch>
        </main>
        <footer>footer</footer>
      </>
    );
  }
}
export default App;
