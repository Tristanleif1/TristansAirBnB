import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSpots } from "../../store/spots";
import SpotComponent from "./SpotComponent";
import "./AllSpots.css"

const SpotsListing = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spot.Spots));
  const newSpotCreated = useSelector((state) => state.spot.newSpotCreated);


 useEffect(() => {
  dispatch(loadAllSpots())
 }, [dispatch])


  useEffect(() => {
    if(newSpotCreated)
    dispatch(loadAllSpots());
  }, [dispatch, spots, newSpotCreated]);

  return (
    <div className="ui fixed menu">
      <div className="ui container center spot-list">
        {spots && spots.map((spot) => (
          <SpotComponent key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default SpotsListing;
























// const SpotsListing = () => {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state);
//   console.log(state)

//   useEffect(() => {
//     dispatch(loadAllSpots());
//   }, []);

//   // console.log(spots.spot);

//   // console.log(spots);

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

//   // console.log(spots.spot);

//   // console.log(spots);

//   return (
//     <div className="ui fixed menu">
//       <div className="ui container center">
//         <SpotComponent />
//       </div>
//     </div>
//   );
// };

// export default SpotsListing;
