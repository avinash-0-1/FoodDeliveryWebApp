import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <>
  <footer className="footer" id='footer'>
  <div className="footer-container">
    <div className="footer-section">
      <h1>SAFFRON <br/>kitchen</h1>
      <p>Delicious food delivered to your door, anytime, anywhere. Powered by technology, driven by taste.</p>
      <div className="social-icons">
        <a href="#"><img src={assets.facebook_icon} alt="Facebook"/></a>
        <a href="#"><img src={assets.twitter_icon} alt="Twitter"/></a>
        <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn"/></a>
      </div>
    </div>

    <div className="footer-section">
      <h4>COMPANY</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Delivery</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>RESOURCES</h4>
      <ul>
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Delivery Info</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Help</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>GET IN TOUCH</h4>
      <ul>
        <li><a href="#">+91 9876543210</a></li>
        <li><a href="#">contact@tomato.com</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2025. Created by Avinash</p>
  </div>
</footer>

    </>
  )
}

export default Footer