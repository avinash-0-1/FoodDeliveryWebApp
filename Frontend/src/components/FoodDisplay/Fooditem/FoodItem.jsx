import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../Context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

    // const [itemCount, setItemCount] = useState(null)    it's not a good practice we define single state & it's counter value 0 , so it creates one state for all 32 product which is not a best practice to do so. 

    const {cartItems,setCartItems,addToCart,removeFormCart,url} = useContext(StoreContext)

  return (
    <div className='food_item'>
        <div className="food_item_img_Container">
            <img className='food_item_image' src={url+"/images/"+image} alt="" />
            {!cartItems[id] ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/> 
            : 
            <div className="food_item_counter">
                <img  onClick={()=>removeFormCart(id)} src={assets.remove_icon_red} alt=""/>
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)}  src={assets.add_icon_green} alt=""/>
            </div>
            }
        </div>
        <div className="food_item_info">
            <div className="food_item_name_rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food_item_desc'>{description}</p>
            <p className="food_item_price">₹ {price}</p>
        </div>
    </div>
  )
}

export default FoodItem