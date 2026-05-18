import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'



const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("mobile-app")

  const{ getTotal_cartAmount,token,setToken } = useContext(StoreContext)
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo2} alt="" className="logo" /></Link>
        <ul className='navbar_menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore_menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
    
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar_right">
            <img src={assets.search_icon} alt=""/>
            <div className="navbar_search_icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt=""/></Link>
                <div className={getTotal_cartAmount()===0?"":"dot"}></div>             {/* in the main code file the link tag is here after div*/}
            </div>
             {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }
            
        </div>
    </div>
  )
}

export default Navbar