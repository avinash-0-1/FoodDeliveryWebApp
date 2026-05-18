import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='left'>
        <img className='logo' src={assets.logo2} alt=""/>
        <p>ADMIN Panel</p>
      </div>
        <img className='profile' src={assets.profile_image} alt=""/>
    </div>
  )
}

export default Navbar