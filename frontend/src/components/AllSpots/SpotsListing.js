import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSpots } from "../../store/spots";
import SpotComponent from "./SpotComponent";
import "./AllSpots.css"

const SpotsListing = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadAllSpots());
  }, []);

  console.log(spots.spot);

  // console.log(spots);

  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <SpotComponent />
      </div>
    </div>
  );
};

export default SpotsListing;
