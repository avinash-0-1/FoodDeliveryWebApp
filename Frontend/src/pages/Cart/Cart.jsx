import React, { useContext, useState } from 'react'
import './cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  
  const { cartItems, food_list, removeFormCart , getTotal_cartAmount,url ,deliveryCharge , discountPrice, setDiscountPrice, token} = useContext(StoreContext);
  const navigate = useNavigate();
  

  
// ----------------------------------- promocode logic -----------------------------------------------------------
const [coupan, setCoupan] = useState('');
  const code = "super100";

  const coupan_code = (e)=>{
    setCoupan(e.target.value);
  }

  const handle_check= ()=>{

    if (getTotal_cartAmount() > 200) {
      if(coupan === code){
        setDiscountPrice(100);
      }
      else{
        setDiscountPrice(0);
      }
    }
    else if(coupan !== code) {
      toast.error('Invalid coupan code')
    }
    else{
      toast.info('Order above 200 to Avail the offer')
    }
  }
// -------------------------------------------------------------------------------------------------------
  return (
    
    <div className='cart'>
      <div className="cart_items">
        <div className="cart_items_titles">
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {

          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className='cart_items_titles cart_items_item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFormCart(item._id)} className='cross'>X</p>
                  <br />
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart_bottom">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>₹ {getTotal_cartAmount()}</p>
            </div>
            <hr/>
            <div className="cart_total_details">
              <p>Delivery fee</p>
              <p>₹ {getTotal_cartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr/>
            <div className="cart_total_details">
              <p>Total</p>
              <p>₹ {getTotal_cartAmount() === 0 ? 0 : getTotal_cartAmount()+ deliveryCharge - discountPrice}</p>
            </div>
          </div>

        <button onClick={()=> navigate('/order')} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart_promocode">
          <div>
          <p>If you have a promocode Enter Here</p>
          <div className="cart_promocode_input">
            <input onChange={coupan_code} value={coupan} type="text" placeholder='promocode'/>
            <button onClick={handle_check}>SUBMIT</button>
          </div>
          <p className='text-sm'> * Promocode is applicable only for orders above 200/-</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart