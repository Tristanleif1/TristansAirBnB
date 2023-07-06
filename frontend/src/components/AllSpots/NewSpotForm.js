import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const spotData = {
      address: streetAddress,
      city,
      state,
      country,
      description,
      name,
      price,
    };

    dispatch(createSpot(spotData))
      .then((createdSpot) => {
        if (createdSpot) {
          // Handle successful spot creation
          console.log('Spot created:', createdSpot);
          // Reset form fields
          setCountry('');
          setStreetAddress('');
          setCity('');
          setState('');
          setDescription('');
          setName('');
          setPrice(0);
        }
      })
      .catch((error) => {
        // Handle spot creation error
        console.error('Spot creation error:', error);
      });
  };

  return (
    <div>
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        {/* First Section: Place Location */}
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        {/* Render inputs for street address, city, and state */}

        {/* Second Section: Describe the Place */}
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Third Section: Create a Title */}
        <h2>Create a title for your spot</h2>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Fourth Section: Set Base Price */}
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />

        {/* Submit Button */}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default NewSpotForm;
