

import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';
import { createIngredient } from '../../State/Admin/Ingredients/Action';
import './CreateIngredientForm.css';


const CreateIngredientForm = ({handleClose}) => {
    const {id}=useParams();
    const dispatch=useDispatch();


  // Get data from Redux store
    const {auth,restaurant,ingredients}=useSelector(store=>store)

     // Get JWT token
    const jwt = localStorage.getItem("jwt")

 
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    ingredientCategoryId:''
  });

  /* -------------------- HANDLE FORM SUBMIT -------------------- */

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

  // Reset form after submit
    setFormData({
      name: '',
      ingredientCategoryId:''
    })

      // Close modal/dialog
    handleClose()


    // Prepare final data payload
    const data={...formData,restaurantId:restaurant.usersRestaurant.id}


    // Dispatch create ingredient action
    dispatch(createIngredient({jwt:auth.jwt || jwt,data}))
    
  };

  /* -------------------- HANDLE INPUT CHANGE -------------------- */
  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=' '>
        <div className='CIF-con'>

      {/* -------------------- TITLE -------------------- */}
          <h1 className='CIF-head'>Create Ingredient</h1>

          {/* -------------------- FORM START -------------------- */}
        <form className="CIF-form" onSubmit={handleFormSubmit}>
           {/* Ingredient Name */}
      <TextField
        label="Ingredient"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
      />
      {/* Category Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.ingredientCategoryId}
          label="Category"
          name='ingredientCategoryId'
          onChange={handleInputChange}
        >
          
        {/* Submit Button */}
          {ingredients.category.map((item)=> <MenuItem value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
     
        {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateIngredientForm;