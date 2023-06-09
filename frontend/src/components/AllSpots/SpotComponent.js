import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ConfirmationModal from "./ConfirmationDeleteModal";
import { deleteSpot } from "../../store/spots";
import "./AllSpots.css";

//MAKE SURE TO CHECK AVGRATING TO FIXED(2) FOR DEPLOYMENT, THIS MIGHT NEED TO BE CHANGED.
const SpotComponent = ({ spot, isManageSpotsComponent }) => {
  const dispatch = useDispatch(); // To dispatch actions
  const { price, previewImage, city, state, id, avgRating } = spot;
  const [showModal, setShowModal] = useState(false);

  // Event handler to stop the parent Link from triggering
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Dispatch deleteSpot action here
     dispatch(deleteSpot(id));

    // Close the modal
    setShowModal(false);
  };

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
              <div className="meta">
              <i className="fa-solid fa-star"></i>
                {avgRating ? ` ${avgRating.toFixed(2)}` : ' New'}
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
