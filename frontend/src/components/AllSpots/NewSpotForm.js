import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { loadAllSpots } from "../../store/spots";
import "./NewSpot.css";

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!previewImage) {
      newErrors.previewImage = "Preview Image URL is required.";
    }
    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!description) {
      newErrors.description = "Description needs 30 or more characters.";
    } else if (description.length < 30) {
      newErrors.description = "Description needs 30 or more characters.";
    }
    if (!streetAddress) {
      newErrors.streetAddress = "Street Address is required.";
    }
    if (!city) {
      newErrors.city = "City is required.";
    }
    if (!state) {
      newErrors.state = "State is required.";
    }
    if (!country) {
      newErrors.country = "Country is required.";
    }
    if (!price || price === 0) {
      newErrors.price = "Price is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const spotData = {
      ownerId: user.id,
      address: streetAddress,
      city,
      state,
      country,
      description,
      name,
      price,
      images: [previewImage, image1, image2, image3, image4].filter(Boolean),
    };

    dispatch(createSpot(spotData))
      .then((createdSpot) => {
        if (createdSpot) {
          setCountry("");
          setStreetAddress("");
          setCity("");
          setState("");
          setDescription("");
          setName("");
          setPrice(0);
          setPreviewImage("");
          setImage1("");
          setImage2("");
          setImage3("");
          setImage4("");
          history.push(`/spots/${createdSpot.id}`);
          dispatch(loadAllSpots());
        }
      })
      .catch((error) => {
        setErrors({ ...errors, api: error.toString() });
      });
  };

  const renderError = (field) => {
    return errors[field] && <p className="spot-form-error">{errors[field]}</p>;
  };

  return (
    <div className="spot-form-container">
      <h1 className="spot-form-title">Create a New Spot</h1>

      <form className="spot-form" onSubmit={handleSubmit}>
        <h2>Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <input
          id="country"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        {renderError("country")}
        <input
          id="streetAddress"
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        {renderError("streetAddress")}
        <input
          id="city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {renderError("city")}
        <input
          id="state"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        {renderError("state")}

        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {renderError("description")}

        <h2>Create a title for your spot</h2>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {renderError("name")}

        <h2>Set a base price for your spot</h2>
        <p>
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
        />
        {renderError("price")}

        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          className="spot-form-input"
          type="text"
          placeholder="Preview Image URL"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        {renderError("previewImage")}
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
          Create Spot
        </button>
      </form>
    </div>
  );
};

export default NewSpotForm;
