import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleSpot } from "../../store/spots";
import "./SpotDetails.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const { spot, isLoading } = useSelector((state) => state.selectedSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (isLoading || !spot) {
    return <div>Loading...</div>;
  }

  const { name, city, state, country, SpotImages, Owner, description, price } = spot;

  const previewImage = SpotImages?.find((image) => image.preview)?.url;

  const otherImages = SpotImages?.filter((image) => !image.preview);

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
          alt={name}
          className="spot-detail__image-large"
        />
        <div className="spot-detail__image-thumbnails">
          {otherImages?.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${name} ${index}`}
              className="spot-detail__image-small"
            />
          ))}
        </div>
      </div>
      <p className="spot-detail__host">Hosted by {Owner.firstName} {Owner.lastName}</p>
      <p className="spot-detail__description">{description}</p>
      <div className="spot-detail__booking">
        <p className="spot-detail__price">Price: ${price} per night</p>
        <button onClick={reserveSpot} className="spot-detail__reserve-button">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default SpotDetail;
