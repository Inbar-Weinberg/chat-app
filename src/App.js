import { Route, Switch } from "react-router-dom";
import { Auth, useAuthState } from "./app/firebase";

import { useDispatch } from "react-redux";
import { setUserState } from "./features/loginState/LoginSlice";

import { Navbar, Register, Login } from "./components";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(Auth);

  if (user) {
    dispatch(setUserState({ email: user.email, displayName: user.displayName }));
    return (
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <span>Hello {user.displayName}</span>
            </Route>
            <Route path="/chat" exact>
              <div>chat</div>
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route>NotFound</Route>
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
              <Register />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route>NotFound</Route>
          </Switch>
        </main>
        <footer>footer</footer>
      </>
    );
  }
}
export default App;
