import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotsListing from "./components/AllSpots/SpotsListing";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetail from "./components/AllSpots/SpotDetail";
import NewSpotForm from "./components/AllSpots/NewSpotForm";
import ManageSpotsComponent from "./components/AllSpots/ManageSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route exact path="/">
          <SpotsListing />
        </Route>
        <Route exact path="/spots">
          <NewSpotForm />
        </Route>
        <Route path="/spots/mySpots">
          <ManageSpotsComponent />
        </Route>
        <Route path="/spots/:spotId">
          <SpotDetail />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="">Page Not Found</Route>
      </Switch>
      )}
    </>
  );
}

export default App;
