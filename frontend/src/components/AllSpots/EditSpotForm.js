import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editSpot, loadSingleSpot } from "../../store/spots";
import "./AllSpots.css";

const EditSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.selectedSpot.spot);

  // add states for new fields
  const [streetAddress, setStreetAddress] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (spot) {
      setStreetAddress(spot.address);
      setCountry(spot.country);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
      if (spot.SpotImages && spot.SpotImages.length > 0) {
        const images = spot.SpotImages.map((image) => image.url);
        setPreviewImage(images[0]);
        setImage1(images[1] || "");
        setImage2(images[2] || "");
        setImage3(images[3] || "");
        setImage4(images[4] || "");
      }
    }
  }, [spot]);

  useEffect(() => {
    dispatch(loadSingleSpot(spotId));
  }, [dispatch, spotId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation
    let newErrors = {};

    if (description.length < 30) {
      newErrors.description = "Description needs 30 or more characters.";
    }
    if (!previewImage) {
      newErrors.previewImage = "Preview Image URL is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If we passed all checks, clear errors
    setErrors({});

    const spotData = {
      id: spotId,
      address: streetAddress,
      city,
      state,
      country,
      description,
      name,
      price,
      images: [previewImage, image1, image2, image3, image4].filter(Boolean),
    };

    dispatch(editSpot(spotData))
      .then((updatedSpot) => {
        if (updatedSpot) {
          history.push(`/spots/${updatedSpot.id}`);
        }
      })
      .catch((error) => {
        setErrors({ ...errors, api: error.toString() });
      });
  };
  return (
    <div className="spot-form-container">
      <h1 className="spot-form-title">Create a New Spot</h1>
      <form className="spot-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="spot-form-errors">
            {errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}

        <h2 className="spot-form-section-title">Where's your place located?</h2>
        <p className="spot-form-section-description">
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label htmlFor="streetAddress">Street Address</label>
        <input
          id="streetAddress"
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          required
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <h2 className="spot-form-section-title">
          Describe your place to guests
        </h2>
        <p className="spot-form-section-description">
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h2 className="spot-form-section-title">
          Create a title for your spot
        </h2>
        <p className="spot-form-section-description">
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <h2 className="spot-form-section-title">
          Set a base price for your spot
        </h2>
        <p className="spot-form-section-description">
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <input
          type="number"
          placeholder="Price per night (USD)"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />

        <h2 className="spot-form-section-title">
          Liven up your spot with photos
        </h2>
        <p className="spot-form-section-description">
          Submit a link to at least one photo to publish your spot.
        </p>
        <input
          className="spot-form-input"
          type="text"
          placeholder="Preview Image URL"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
        <input
          className="spot-form-input"
          type="text"
          placeholder="Image URL"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <input
          className="spot-form-input"
          type="text"
          placeholder="Image URL"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <input
          className="spot-form-input"
          type="text"
          placeholder="Image URL"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <input
          className="spot-form-input"
          type="text"
          placeholder="Image URL"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
        />
        <button className="spot-form-button" type="submit">
          Update your Spot
        </button>
      </form>
    </div>
  );
};

export default EditSpotForm;
