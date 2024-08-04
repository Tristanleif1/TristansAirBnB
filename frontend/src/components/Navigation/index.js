import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../Tristans-Travels-Logo-removebg-preview.png';
import boatsIcon from '../../airbnb-boats-icon-removebg-preview.png';
import cabinIcon from '../../airbnb-cabin-icon-removebg-preview.png'
import lakefrontIcon from '../../airbnb-lakefront-icon-removebg-preview.png';
import mansionIcon from '../../airbnb-mansion-icon-removebg-preview.png';
import poolsIcon from '../../airbnb-pools-icon-removebg-preview.png';
import skiingIcon from '../../airbnb-skiing-icon-removebg-preview.png';
import treehouseIcon from '../../airbnb-treehouses-icon-removebg-preview.png';
import trendingIcon from '../../airbnb-trending-icon-removebg-preview.png';
import viewsIcon from '../../airbnb-views-icon-removebg-preview.png';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
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
      <div className="spot-categories">
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={cabinIcon} alt='category-logo'></img>
                <span>Cabin</span>
            </div>
            <div className='labelled-button-label' style={{ top: '195px', left: '123px' }}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={boatsIcon} alt='category-logo'></img>
                <span>Boats</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={lakefrontIcon} alt='category-logo'></img>
                <span>Lakefront</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={mansionIcon} alt='category-logo'></img>
                <span>Mansion</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={poolsIcon} alt='category-logo'></img>
                <span>Pools</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={skiingIcon} alt='category-logo'></img>
                <span>Skiing</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={treehouseIcon} alt='category-logo'></img>
                <span>Treehouses</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={trendingIcon} alt='category-logo'></img>
                <span>Trending</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
          <div className='spot-type-labelled-button'>
            <div className='spot-type-icon'>
              <img className='spot-category-image' src={viewsIcon} alt='category-logo'></img>
                <span>Views</span>
            </div>
            <div className='labelled-button-label' style={{ top: '204px', left: '84px', position: 'absolute'}}>Coming soon</div>
          </div>
      </div>
    </div>
  );
}

export default Navigation;
