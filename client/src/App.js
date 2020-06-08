import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import PostDetail from "./pages/postDetail";
import Login from "./pages/login";
import Signup from "./pages/signUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Signup />
        </Route>
        <Route path="/post/:id">
          <PostDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
