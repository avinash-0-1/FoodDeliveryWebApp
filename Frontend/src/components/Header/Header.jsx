import React from 'react'
import './header.css'
import {assets} from '../../assets/assets' 

const Header = () => {
  return (
    <>
    <div className='container'>
      <div className="wrapper">
        <img src={assets.bg1} alt="" />
        <img src={assets.bg2} alt="" />
        <img src={assets.bg3} alt="" />
        <img src={assets.bg4} alt="" />
      </div>
      <div className=" header-contents">
        <div className="header_texts">
        <h2>Elevate Your Taste, the Saffron Way</h2>
        <p>At Saffron Kitchen, we blend age-old recipes with modern flair to bring you soul-satisfying meals rich in flavor and culture. From aromatic spices to heartwarming dishes, every bite is a celebration of authentic taste and culinary craftsmanship. Come savor the essence of tradition, served fresh.</p>
        {/* <p>Choose from a Diverse menu featuring a delectable array of the dishes crafted with the finest ingredients and culinary expertise.Our  </p> */}
        <button>View Menu</button> 
        </div>
      </div>
    </div>
    </>
  )
}

export default Header