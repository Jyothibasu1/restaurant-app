import { Button, Chip, Divider, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cart.action";
import './CartItemCard.css';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store)
  const handleUpdateCartItem = (value) => {
    if(value===-1 && item.quantity==1){
      handleRemoveCartItem()
    }
    const data={ cartItemId: item.id, quantity: item.quantity + value }
    dispatch(
      updateCartItem({data,jwt:auth.jwt || jwt})
    );
  };
  const handleRemoveCartItem=()=>{
    dispatch(removeCartItem({cartItemId:item.id,jwt:auth.jwt || jwt}))
    
  }
  return (
    <div className="CIC-card">
       <div className="CIC-imgCon">
        <div>
          <img
            className="CIC-img"
            src={item.food.images[0]}
            alt=""
          />
        </div>

          <div className="CIC-DC">
             <div className="CIC-D ">
            <p className="">{item.food.name}</p>
            {
              <div className="CIC-updateCon">
                <div className="CIC-updateCItem">
                  <IconButton
                    onClick={() => handleUpdateCartItem(-1)}
                    color="primary"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <div className=" CIC-ItemQuant">
                    {item.quantity}
                  </div>

                  <IconButton
                    onClick={() => handleUpdateCartItem(1)}
                    color="primary"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            }
          </div>

          <p>₹{item.totalPrice}</p>
        </div>
      </div>
      <div className="CIC-item">
  {(item.ingredients || []).map((ingredient, idx) => (
    <Chip key={idx} label={ingredient} />
  ))}
</div>
      
  </div>
  );
};

export default CartItemCard;