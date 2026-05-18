import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'


const LoginPopUp = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState('SignUp')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            // loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

  return (
    <div className='LoginPopUp'>
        <form onSubmit={onLogin} className="loginPopup_container">
            <div className="loginPopUp_title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="loginPopUP_input">
                {currState === "SignUp" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState === "Login" ? "Login" : "Create account"}</button>
            <div className="loginPopUP_condition">
                <input type="checkbox" required />
                <p>By continuing, I argree to the <br></br>terms and condition of the use & Privacy Policy</p>
            </div>
            {currState==='Login'?
            <p>Create a New account ? <span onClick={()=>setCurrState('SignUp')}>Click Here</span></p>:
            <p>Already have an acoount ? <span onClick={()=>setCurrState('Login')}>Login Here</span></p>}
           
        </form>
    </div>
  )
}

export default LoginPopUp