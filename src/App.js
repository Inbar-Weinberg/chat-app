import { Route, Switch } from "react-router-dom";
import { Auth, useAuthState } from "./app/firebase";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserState,
  userUpdateCompleteSelector,
  displayNameSelector,
} from "./features/loginState/LoginSlice";

import { Navbar, Authorization, Chat } from "./components";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(Auth);

  const displayName = useSelector(displayNameSelector);
  const userUpdateComplete = useSelector(userUpdateCompleteSelector);
  if (userUpdateComplete && user) {
    dispatch(
      setUserState({ email: user.email, displayName: user.displayName, uid: user.uid })
    );

    return (
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <span>Hello {displayName}</span>
            </Route>
            <Route path="/chat" exact>
              <Chat/>
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
    dispatch(
      setUserState({ email: undefined, displayName: undefined, userId: undefined })
    );
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
