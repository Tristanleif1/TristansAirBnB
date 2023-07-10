import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AllSpots.css"

const SpotComponent = ({spot, isManageSpotsComponent}) => {
  const { price, previewImage, city, state, id } = spot;

  return (
    <div className="four column wide">
      <Link to={`/spots/${id}`}>
        <div className="ui link cards">
          <div className="card">
            <div className="image">
              <img src={previewImage} alt={city} />
            </div>
            <div className="content">
              <div className="header">{city}</div>
              <div className="meta price">$ {price}</div>
              <div className="meta">{state}</div>
              {isManageSpotsComponent && (
                <div>
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotComponent;
























// const SpotComponent = () => {
//   const spots = useSelector((state) => state.spot.Spots);
//   // const {price, previewImage, city, state} = spots;
//   const renderList = spots.map((spot) => {
//     const { price, previewImage, city, state, id } = spot;
//     return (
//       <div className="four column wide" key={id}>
//         <Link to={`/spots/${id}`}>
//         <div className="ui link cards">
//           <div className="card">
//             <div className="image">
//               <img src={previewImage} alt={city} />
//             </div>
//             <div className="content">
//               <div className="header">{city}</div>
//               <div className="meta price">$ {price}</div>
//               <div className="meta">{state}</div>
//             </div>
//           </div>
//         </div>
//         </Link>
//       </div>
//     );
//   });

//   return <div className="spot-list">{renderList}</div>
// };

// export default SpotComponent;
