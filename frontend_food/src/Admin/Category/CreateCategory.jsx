import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';
import './CreateCategory.css';


const CreateCategory = ({handleClose}) => {
  // getting restaurant id from URL
    const {id}=useParams();
    const dispatch=useDispatch();
    // getting auth and restaurant data from redux
    const {auth,restaurant}=useSelector(store=>store)
    // getting token from local storage
    const jwt = localStorage.getItem("jwt")
 // state for form data
  const [formData, setFormData] = useState({
    categoryName: '',
    restaurantId: '',
  });

  // when form is submitted
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // preparing data to send
    const data={
        name:formData.categoryName,
        restaurant:{
            id
        }
    }

     // dispatch action to create category
    dispatch(createCategoryAction({reqData:data, jwt: auth.jwt || jwt}))

    // clearing form after submit
    setFormData({
      categoryName: '',
      restaurantId: '',
    })

    // closing modal
    handleClose()
    console.log('Form submitted:', formData);  // checking in console
  };

  // handling input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=' '>
        <div className='CC-con'>
          {/* heading */}
          <h1 className='CC-head'>Create Category</h1>

           {/* form starts */}
        <form className="CC-Form" onSubmit={handleFormSubmit}>

            {/* category name input */}
      <TextField
        label="Category Name"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
        fullWidth
      />
     
     {/* submit button */}
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateCategory;
