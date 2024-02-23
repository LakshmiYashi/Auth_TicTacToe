import React from "react";
import {Switch , Route , Redirect ,BrowserRouter as Router} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Game from "./pages/Game/Game";


const authGuard = (Component) => () => {
    return localStorage.getItem("token") ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    );
  };



const Routes = (props) => {
    return (
        <Router {...props} >
            <Switch>
                <Route path = "/login">
                    <Login />
                </Route>
                <Route path ="/register">
                    <Register />
                </Route>
                <Route path = "/game" render ={authGuard(Game)}>
                    <Game />
                </Route>
                <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>

            </Switch>
        </Router>
    );
}

export default Routes;