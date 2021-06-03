import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import UserContext from "./userContext";

/** Routes for Jobly App */
/** this is where our userObject is provided to all child components  */
function Routes({ currentUser, logInUser, registerFromForm }) {
  return (
    <UserContext.Provider value={{ currentUser }}>
      <Switch>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
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
          <LoginForm
            logInUser={logInUser}
            currentUser={currentUser}
          />
        </Route>
        <Route exact path="/signup">
          <SignupForm
            registerFromForm={registerFromForm}
            currentUser={currentUser}
          />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </UserContext.Provider>
  )
}

export default Routes;