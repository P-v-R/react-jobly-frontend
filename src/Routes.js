import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** Routes for Jobly App */
function Routes({ token, currentUser, loginFromForm, registerFromForm }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:name">
        <CompanyDetail />
      </Route>
      <Route exact path="/jobs">
        <JobList />
      </Route>
      <Route exact path="/login">
        <LoginForm loginFromForm={loginFromForm}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm registerFromForm={registerFromForm}/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;