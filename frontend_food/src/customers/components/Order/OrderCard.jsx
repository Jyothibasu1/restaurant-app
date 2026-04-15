import { Button, Card } from "@mui/material";
import React from "react";
import './OrderCard.css';

const OrderCard = ({order,status}) => {
  return (

      <Card className="OC-card ">
      <div className="OC-con">
        <img
          className="OC-img"
          src={order.food.images[0]}
          alt=""
        />
        <div>
          <p>{order.food.name}</p>

           <p className="OC-price">₹{order.food.price}</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed" variant="contained">{status}</Button>
      </div>
    </Card>
  );
};

export default OrderCard;