import { csrfFetch } from "./csrf";
const LOAD = "spots/LOAD";
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const ADD_SPOT = "spots/ADD_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";

const load = (spot) => ({
  type: LOAD,
  spot,
});

const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const loadAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const loadedSpots = await response.json();
    dispatch(loadSpots(loadedSpots));
    return loadedSpots.Spots;
  }
};

export const loadSingleSpot = (id) => async (dispatch) => {
  dispatch(load({ spot: null, isLoading: true }));

  const response = await fetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(load({ spot, isLoading: false }));
  } else {
    console.error("Failed to load spot", id);
    dispatch(load({ spot: null, isLoading: false }));
  }
};

export const loadUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/mySpots`);

  if (response.ok) {
    const userSpots = await response.json();
    dispatch(loadSpots(userSpots));
    return userSpots;
  }
};

export const createSpot = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const createdSpot = await response.json();
    dispatch(addSpot(createdSpot));
    // dispatch(loadAllSpots());
    return createdSpot; // Return the created spot
  } else {
    return response;
  }
};

// export const createSpot = (data) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const createdSpot = await response.json();

//   if (createdSpot) {
//     dispatch(addSpot(createdSpot))

//     setTimeout(() => {
//       dispatch(loadAllSpots());
//     }, 2000);
//   }

//   return new Promise((resolve, reject) => {
//     if (createdSpot) {
//       resolve(createdSpot);
//     } else {
//       reject(new Error('Spot could not be created'));
//     }
//   });
// };

export const editSpot = (spot) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spot),
    });


    if (response.ok) {
      const editedSpot = await response.json();
      dispatch(updateSpot(editedSpot));
      dispatch(loadSingleSpot(editedSpot.id));
      return editedSpot;
    } else {
      const error = await response.json();
      return { errors: error };
    }
  } catch (error) {
    return { errors: error.toString() };
  }
};

export const deleteSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeSpot(id));
  } else {
    const error = await response.json();
    console.error(error.message);
  }
};

const spotInitialState = {
  Spots: [],
  newSpotCreated: false,
};

export const spotReducer = (state = spotInitialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        ...state,
        Spots: action.spots.Spots,
        newSpotCreated: false,
      };
    case ADD_SPOT:
      return {
        ...state,
        Spots: [...state.Spots, action.spot],
        newSpotCreated: !state.newSpotCreated,
      };
    case UPDATE_SPOT:
      return {
        ...state,
        Spots: state.Spots.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
      };
    case REMOVE_SPOT:
      return {
        ...state,
        Spots: state.Spots.filter((spot) => spot.id !== action.spotId),
      };
    default:
      return state;
  }
};

const initialState = {
  spot: null,
  isLoading: true,
};

export const selectedSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return action.spot;
    default:
      return state;
  }
};

// const spotInitialState = {
//   Spots: [],
// };

// export const spotReducer = (state = spotInitialState, action) => {
//   switch (action.type) {
//     case LOAD_SPOTS:
//       const allSpots = {};
//       action.spots.Spots.forEach((spot) => {
//         allSpots[spot.id] = spot;
//       });
//       return {
//         ...state,
//         Spots: action.spots.Spots,
//       };
//       case ADD_SPOT:
//       return {
//         ...state,
//         Spots: [...state.Spots, action.spot]
//       };
//     default:
//       return state;
//   }
// };

// export const createSpot = (data) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const createdSpot = await response.json();
//   dispatch(addSpot(createdSpot))
//   return new Promise(resolve => {
//     if (createdSpot) {
//       resolve(createdSpot);
//     } else {
//       throw new Error('Spot could not be created');
//     }
//   });
// };
