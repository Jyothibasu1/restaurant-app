import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import EastIcon from "@mui/icons-material/East";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { useNavigate } from "react-router-dom";
import './SearchDishCard.css';

const SearchDishCard = ({item}) => {
    const dispatch = useDispatch();
  const handleAddItemToCart = () => {
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(data));
  };
  const navigate=useNavigate()
  return (
     <Card className=" SDC-Con">
      <CardHeader 
      className="SDC-header"
        action={
          <IconButton onClick={()=>navigate(`/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`)} aria-label="settings">
            <EastIcon />
          </IconButton>
        }
        title={<p 
          className="SDC-text"
          > {item.restaurant?.name} </p>}
        
      />
      <CardContent>
        <div>
        <div className="SDC-con">
           <div className="SDC-details">
           
            <p className="SDC-IN">{item.name} </p>
            <p>₹{item.price}</p>
             <p className="SDC-ID">
              {item.description}
            </p>
          </div>
          <div className="SDC-Img">
            <img
              className="SD-Img"
              src={item.images[0]}
              alt=""
            />
            <Button onClick={handleAddItemToCart} size="small">Add</Button>
          </div>
        </div>
      </div>
      </CardContent>
      
    </Card>
  );
};

export default SearchDishCard;