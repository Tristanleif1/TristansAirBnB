

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

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const removeSpot = (spot) => ({
  type: REMOVE_SPOT,
  spot,
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
  }
};

export const loadSingleSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(load(spot));
  }
};

export const createSpot = (data) => async (dispatch) => {
  const response = await fetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const createdSpot = await response.json();
  console.log(createdSpot);
  dispatch(addSpot(createdSpot));
};

export const editSpot = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  const editedSpot = await response.json();
  dispatch(updateSpot(editedSpot));
};

export const deleteSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeSpot(id));
  }
};


const initialState = {
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot
      })
      return {
        ...state,
        ...allSpots
      }
    case REMOVE_SPOT:
      const newState = {...state};
      delete newState[action.spot.id];
      return newState;

    case UPDATE_SPOT:
      return {
        ...state,
        [action.spot.id]: action.spot
      };
    case ADD_SPOT:
      if(!state[action.spot.id]){
        const newState = {
          ...state,
          [action.spot.id]: action.spot
        }
      };
      default:
      return state;
  }
}
