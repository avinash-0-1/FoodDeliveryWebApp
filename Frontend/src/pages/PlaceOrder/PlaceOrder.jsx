import React, { useContext, useEffect, useState } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {

    const navigate = useNavigate();
  const{getTotal_cartAmount,token,food_list,cartItems , url , setCartItems , deliveryCharge ,currency, discountPrice, setDiscountPrice} = useContext(StoreContext);

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const place_Order = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
                  
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotal_cartAmount() + deliveryCharge - discountPrice ,                    // discountPrice not working
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error(" ERROR Something Went Wrong")
            }
        }
        else{
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Something Went Wrong")
            }
        }

    }    

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotal_cartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])


  return (
    <form onSubmit={place_Order} className='placeOrder'>
      <div className="placeOrder_left">
        <p className='title'>Delivery Information</p>
                <div className="multi_fields">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi_fields">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi_fields">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
      </div>

       <div className="placeOrder_right">
                <div className="cart_total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart_total_details"><p>Subtotal</p><p>{currency}{getTotal_cartAmount()}</p></div>
                        <hr />
                        <div className="cart_total_details"><p>Delivery Fee</p><p>{currency}{getTotal_cartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart_total_details"><b>Total</b><b>{currency}{getTotal_cartAmount() === 0 ? 0 : getTotal_cartAmount() + deliveryCharge - discountPrice }</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="cod"?"Place Order":"Proceed To Payment"}</button>
            </div>

    </form>
  )
}

export default PlaceOrder