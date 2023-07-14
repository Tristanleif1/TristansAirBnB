import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { loadSingleSpot } from "../../store/spots";
import { loadSpotReviews } from "../../store/reviews";
import DeleteReview from "../Reviews/DeleteReviewModal.js";
import ReviewForm from "../Reviews/ReviewFormComponent";
import { useModal } from "../../context/Modal";
import "./SpotDetails.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const { spot, isLoading } = useSelector((state) => state.selectedSpot);
  const { list: reviews, loading: reviewsLoading } = useSelector(
    (state) => state.reviews
  );
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  const openDeleteReviewForm = (reviewId) => {
    setModalContent(
      <DeleteReview reviewId={reviewId} closeModal={closeModal} />
    );
  };

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
    dispatch(loadSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (isLoading || !spot) {
    return <div>Loading...</div>;
  }

  const {
    name,
    city,
    state,
    country,
    SpotImages,
    Owner,
    description,
    price,
    avgStarRating,
    numReviews,
  } = spot;
  const averageRating = Number(avgStarRating).toFixed(2);
  let reviewSummary;
  if (numReviews === 0) {
    reviewSummary = (
      <>
        <i className="fa-solid fa-star"></i> {averageRating}
      </>
    );
  } else if (numReviews === 1) {
    reviewSummary = (
      <>
        <i className="fa-solid fa-star"></i> {averageRating} · {numReviews}{" "}
        Review
      </>
    );
  } else {
    reviewSummary = (
      <>
        <i className="fa-solid fa-star"></i> {averageRating} · {numReviews}{" "}
        Reviews
      </>
    );
  }

  const previewImage = SpotImages?.find((image) => image.preview)?.url;
  const otherImages = SpotImages?.filter((image) => !image.preview);

  const reserveSpot = () => {
    alert("Feature coming soon");
  };

  const sortedReviews = [...reviews].sort(
    (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString([], options);
  };

  const openReviewForm = () => {
    setModalContent(<ReviewForm spotId={spotId} closeModal={closeModal} />);
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
      <p className="spot-detail__host">
        Hosted by {Owner.firstName} {Owner.lastName}
      </p>
      <p className="spot-detail__description">{description}</p>
      <div className="spot-detail__booking">
        <p className="spot-detail__price">Price: ${price} per night</p>
        <p className="spot-detail__rating">{reviewSummary}</p>
        <button onClick={reserveSpot} className="spot-detail__reserve-button">
          Reserve
        </button>
      </div>
      <div className="spot-detail__reviews">
        <h2>Reviews ({reviewSummary})</h2>
        {user &&
          user.id !== Owner.id &&
          !reviews.some((review) => review.userId === user.id) && (
            <button onClick={openReviewForm}>Post Your Review</button>
          )}
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="review">
              {review.User ? (
                <>
                  <h3>{review.User.firstName}</h3>
                  <p>{formatDate(review.createdAt)}</p>
                  <p>{review.review}</p>
                  {user.id === review.userId && (
                    <button onClick={() => openDeleteReviewForm(review.id)}>
                      Delete
                    </button>
                  )}
                </>
              ) : (
                <p>Review from unknown user</p>
              )}
            </div>
          ))
        ) : (
          user && user.id !== Owner.id && <p>Be the first to post a review!</p>
        )}
      </div>
    </div>
  );
};

export default SpotDetail;
