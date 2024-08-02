import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../Tristans-Travels-Logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-menu">
      <ul>
      <li>
          <div className="navbar-logo-title">
            <NavLink exact to="/">
              <img src={logo} alt="logo" className="logo" />
            </NavLink>
            <h1 className="navbar-title">Tristan's Travels</h1>
          </div>
        </li>
      </ul>
      {isLoaded && (
        <div className="profile-button-container">
          {sessionUser && (
            <NavLink to="/spots" className="navbar-create-new-spot-button">Create a New Spot</NavLink>
          )}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
