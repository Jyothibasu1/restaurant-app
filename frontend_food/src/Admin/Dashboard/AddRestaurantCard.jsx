import { Card } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import './AddRestaurantCard.css';

const AddRestaurantCard = () => {

  // hook for navigation
  const navigate = useNavigate();
  return (
    <Card

    // when user clicks card it will go to add restaurant page
      onClick={() => navigate("/admin/add-restaurant")}
       className="AddRestaurant-card"

       // some basic styling
      sx={{ width: 345, m: "1rem" }}
    >
      
      <div className="AddRestaurant-con">

         {/* add icon */}
      <AddIcon sx={{ fontSize: "7rem" }} />

      {/* heading text */}
        <h1 className="AddRestaurant-head">
          Add New Restaurants
        </h1>
        
      </div>
    </Card>
  );
};

export default AddRestaurantCard;