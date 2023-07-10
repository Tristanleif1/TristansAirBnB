import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { loadUserSpots } from '../../store/spots';
import SpotComponent from './SpotComponent';

const ManageSpotsComponent = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spot.Spots));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
      dispatch(loadUserSpots(user.id));
    }, [dispatch, user.id]);

    return (
      <div>
        <h1>Manage Spots</h1>
        {spots.length ? (
          <div className="ui grid container">
            {spots.map((spot) => (
              <SpotComponent key={spot.id} spot={spot} isManageSpotsComponent />
            ))}
          </div>
        ) : (
          <NavLink to="/spots">Create a New Spot</NavLink>
        )}
      </div>
    );
  };

  export default ManageSpotsComponent;
