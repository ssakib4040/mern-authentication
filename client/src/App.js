import "./App.css";
import { Switch, Route } from "react-router-dom";

// routing
import PrivateRoute from "./components/routing/PrivateRoute";

// screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ErrorScreen from "./components/screens/ErrorScreen";

function App() {
  return (
    <div className="container">
      <Switch>
        <PrivateRoute exact path="/" component={PrivateScreen}></PrivateRoute>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/forgotpassword" component={ForgotPasswordScreen}></Route>
        <Route
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        ></Route>

        <Route path="*" component={ErrorScreen}></Route>
      </Switch>
    </div>
  );
}

export default App;
