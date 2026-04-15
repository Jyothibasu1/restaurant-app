import React, { useState } from "react";
import { TextField, Button, makeStyles, Card, Modal, Box } from "@mui/material";
import { Create } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Customers/Restaurant/restaurant.action";
import { createIngredientCategory } from "../../State/Admin/Ingredients/Action";
import './CreateIngredientCategory.css';

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();


  // Get restaurant & auth data from Redux store
  const { auth, restaurant } = useSelector((store) => store);

   // Get JWT token from local storage
  const jwt = localStorage.getItem("jwt");

  // Form state for category name
  const [formData, setFormData] = useState({
    name: "",
  });

  /* -------------------- FORM SUBMIT -------------------- */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    // Clear form after submit
    setFormData({
      name: "",
    });

     // Prepare data to send to backend
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };

     // Dispatch create category action
    dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
     // Close modal/form (if passed from parent)
    handleClose();
  };

  /* -------------------- INPUT CHANGE HANDLER -------------------- */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

     
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="CIC-con">
         {/* -------------------- TITLE -------------------- */}
         <h1 className="CIC-head">
          Create Ingredient Category
        </h1>
          {/* -------------------- FORM -------------------- */}
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Category Name Input */}
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

   {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;