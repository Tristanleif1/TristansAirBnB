import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { loadUserSpots } from "../../store/spots";
import SpotComponent from "./SpotComponent";
import "./AllSpots.css";

const ManageSpotsComponent = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spot.Spots));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadUserSpots(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      <h1>Manage Spots</h1>
      <NavLink to="/spots" className="create-new-spot-button">
        Create a New Spot
      </NavLink>
      {spots.length ? (
        <div className="ui container center spot-list">
          {spots.map((spot) => (
            <SpotComponent key={spot.id} spot={spot} isManageSpotsComponent />
          ))}
        </div>
      ) : (
        <p>You don't have any spots yet.</p>
      )}
    </div>
  );
};

export default ManageSpotsComponent;
