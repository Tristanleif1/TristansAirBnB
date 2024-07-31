import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ConfirmationModal from "./ConfirmationDeleteModal";
import { deleteSpot } from "../../store/spots";
import "./AllSpots.css";

const SpotComponent = ({ spot, isManageSpotsComponent }) => {
  const dispatch = useDispatch();
  const { price, previewImage, city, state, id, avgRating, name } = spot;
  const [showModal, setShowModal] = useState(false);
  // console.log(previewImage);
  // const previewImageUrl = spot.previewImage[0]?.url;
  let previewImageUrl;
  if (Array.isArray(spot.previewImage)) {
    previewImageUrl = spot.previewImage[0].url;
  } else {
    previewImageUrl = spot.previewImage;
  }

  const avgRatingNumber = Number(avgRating);
  const avgRatingDisplay =
    avgRating && !isNaN(avgRatingNumber) ? avgRatingNumber.toFixed(2) : "New";

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(deleteSpot(id));

    setShowModal(false);
  };

  return (
    <div className="four-column-wide" title={name}>
      <Link to={`/spots/${id}`}>
        <div className="ui-link-cards">
          <div className="card">
            <div className="image">
              <img className="spot-image" src={previewImageUrl} alt={city} />
            </div>
            <div className="content">
              <div className="spot-info">
                <div className="spot-info-left">
                  <div className="header">
                    {city}, {state}
                  </div>
                  <div className="meta price">$ {price} / night</div>
                </div>
                <div className="spot-info-right">
                  <div className="spot-info-right">
                    <span className="spot-rating">
                      <i className="fa-solid fa-star"></i> {avgRatingDisplay}
                    </span>
                  </div>
                </div>
              </div>
              {isManageSpotsComponent && (
                <div>
                  <button onClick={handleButtonClick}>
                    <NavLink to={`/spots/${spot.id}/update`}>Update</NavLink>
                  </button>
                  <button
                    onClick={(e) => {
                      handleButtonClick(e);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to remove this spot?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SpotComponent;

//MAKE SURE TO CHECK AVGRATING TO FIXED(2) FOR DEPLOYMENT, THIS MIGHT NEED TO BE CHANGED.
// const SpotComponent = ({ spot, isManageSpotsComponent }) => {
//   const dispatch = useDispatch(); // To dispatch actions
//   const { price, previewImage, city, state, id, avgRating } = spot;
//   const [showModal, setShowModal] = useState(false);

//   // Event handler to stop the parent Link from triggering
//   const handleButtonClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Dispatch deleteSpot action here
//      dispatch(deleteSpot(id));

//     // Close the modal
//     setShowModal(false);
//   };

//   return (
//     <div className="four column wide">
//       <Link to={`/spots/${id}`}>
//         <div className="ui link cards">
//           <div className="card">
//             <div className="image">
//               <img src={previewImage} alt={city} />
//             </div>
//             <div className="content">
//               <div className="header">{city}</div>
//               <div className="meta price">$ {price}</div>
//               <div className="meta">{state}</div>
//               <div className="meta">
//               <i className="fa-solid fa-star"></i>
//                 {avgRating ? ` ${avgRating.toFixed(2)}` : ' New'}
//               </div>
//               {isManageSpotsComponent && (
//                 <div>
//                   <button onClick={handleButtonClick}>
//                     <NavLink to={`/spots/${spot.id}/update`}>Update</NavLink>
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       handleButtonClick(e);
//                       setShowModal(true);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Link>
//       {showModal && (
//         <ConfirmationModal
//           message="Are you sure you want to remove this spot?"
//           onConfirm={handleDelete}
//           onCancel={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };

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
