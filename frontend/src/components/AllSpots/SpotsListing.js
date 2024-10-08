import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSpots } from "../../store/spots";
import SpotComponent from "./SpotComponent";
import { addSpot } from "../../store/spots";
import "./AllSpots.css";

const SpotsListing = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spot.Spots));
  const newSpotCreated = useSelector((state) => state.spot.newSpotCreated);

  useEffect(() => {
    dispatch(loadAllSpots()).then((loadedSpots) => {
      if (
        newSpotCreated &&
        !loadedSpots.some((spot) => spot.id === newSpotCreated.id)
      ) {
        dispatch(addSpot(newSpotCreated));
      }
    });
  }, [dispatch, newSpotCreated]);

  return (
      <div className="spot-list">
        {spots &&
          spots
            .sort((a, b) => a.id - b.id)
            .map((spot) => <SpotComponent key={spot.id} spot={spot} />)}
      </div>
  );
};

export default SpotsListing;

// const SpotsListing = () => {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   (state)

//   useEffect(() => {
//     dispatch(loadAllSpots());
//   }, []);


//   return (
//     <div className="ui fixed menu">
//       <div className="ui container center">
//         <SpotComponent />
//       </div>
//     </div>
//   );
// };

// export default SpotsListing;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadAllSpots } from "../../store/spots";
// import SpotComponent from "./SpotComponent";
// import "./AllSpots.css"

// const SpotsListing = () => {
//   const dispatch = useDispatch();
//   // const spots = useSelector((state) => state);

//   useEffect(() => {
//     dispatch(loadAllSpots());
//   }, []);




//   return (
//     <div className="ui fixed menu">
//       <div className="ui container center">
//         <SpotComponent />
//       </div>
//     </div>
//   );
// };

// export default SpotsListing;
