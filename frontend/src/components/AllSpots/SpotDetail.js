import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleSpot } from "../../store/spots";
import "./SpotDetails.css";


const SpotDetail = () => {
  const { spotId } = useParams();
  const {spot, isLoading} = useSelector((state) => state.selectedSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
  }, [spotId]);

  // console.log(spot);

  if (isLoading || !spot) {
    return <div>Loading...</div>;
  }

  const { name, city, state, country, SpotImages, Owner, description, price } =
    spot;

  // console.log(spot.Owner.firstName)

  const previewImage =
    SpotImages && SpotImages.length
      ? SpotImages.find((image) => image.preview)?.url
      : null;
  console.log(previewImage);

  const reserveSpot = () => {
    alert("Feature coming soon");
  };

  return (
    <div className="spot-detail">
      <h1 className="spot-detail__name">{name}</h1>
      <p className="spot-detail__location">
        Location: {city}, {state}, {country}
      </p>
      <div className="spot-detail__images">
        <img
          src={previewImage}
          alt="Large"
          className="spot-detail__image-large"
        />
        <div className="spot-detail__image-thumbnails">
          {SpotImages?.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Small ${index}`}
              className="spot-detail__image-small"
            />
          ))}
        </div>
      </div>
      <p className="spot-detail__host">
      Hosted by {Owner?.firstName && Owner?.lastName ? `${Owner.firstName} ${Owner.lastName}` : 'Loading host information...'}
      </p>
      <p className="spot-detail__description">{description}</p>
      <div className="spot-detail__booking">
        <p className="spot-detail__price">Price: {price} night</p>
        <button onClick={reserveSpot} className="spot-detail__reserve-button">
          Reserve
        </button>
      </div>
    </div>
  );
};


export default SpotDetail;
