import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createRestaurant } from "../../State/Customers/Restaurant/restaurant.action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton } from "@mui/material";
import './CreateRestaurantForm.css';

// initial values for form fields
const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
  images: [],
};

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();

   // getting token from local storage
  const token = localStorage.getItem("jwt");

   // state for showing loading while uploading image
  const [uploadImage, setUploadingImage] = useState("");

  // function when form is submitted
  const handleSubmit = (values) => {

     // preparing data object
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
      },
      openingHours: values.openingHours,
      images: values.images,
    };

    // dispatching action to create restaurant
    dispatch(createRestaurant({ data, token }));
    console.log(data);
  };

   // using formik for handling form
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  // handling image upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    // showing loading
    setUploadingImage(true);

    // uploading image to cloudinary
    const image = await uploadToCloudinary(file);

    // adding uploaded image to formik state
    formik.setFieldValue("images", [...formik.values.images, image]);

    // stopping loading
    setUploadingImage(false);
  };

  // removing image from list
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    
     <div className="C_R_F-component">
      <div className="C_R_F-con ">

         {/* heading */}
        <h1 className="C_R_F-head">
          Add New Restaurant
        </h1>
       
        {/* form starts here */}
        <form onSubmit={formik.handleSubmit} className="C_R_F-gap">
          <Grid container spacing={2}>
           
           {/* image upload section */}
            <Grid className="C_R_F-grid1" size = {12}>

              {/* hidden file input */}
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              
             {/* upload button */}
              <label className="C_R_F-image" htmlFor="fileInput">
                
                <span className="C_R_F-image-add">
                  <AddPhotoAlternateIcon
                    className="C_R_F-image-text"
                  />
                </span>

                {/* showing loader while uploading */}
                {uploadImage && <div className="C_R_F-progress">
                <CircularProgress />
                </div>}
              </label>

              {/* showing uploaded images */}
               <div className="C_R_F-image-list">
                {formik.values.images.map((image, index) => (
                 
                  <div className="C_R_F-image-index">
                    <img
                      
                      className="C_R_F-images-w"
                      key={index}
                      src={image}
                      alt={`ProductImage ${index + 1}`}
                    />

                    {/* remove button */}
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

              {/* input fields */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>


            {/* address fields */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>

             {/* contact details */}
            <Grid size={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>

            {/* social media */}
            <Grid size={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
            
          </Grid>

          {/* submit button */}
          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;