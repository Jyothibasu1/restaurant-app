import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { createMenuItem } from "../../State/Customers/Menu/menu.action";
import './AddMenuForm.css'

/* -------------------- IMAGE SELECT MENU STYLE -------------------- */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* -------------------- FORM VALIDATION -------------------- */
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),

  imageUrl: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
  vegetarian: Yup.boolean().required("Is Vegetarian is required"),
  seasonal: Yup.boolean().required("Is Gluten Free is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must be greater than or equal to 0"),
});


/* -------------------- INITIAL FORM VALUES -------------------- */
const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  restaurantId: "",

  vegetarian: true,
  seasonal: false,
  quantity: 0,
  ingredients: [],
};

const AddMenuForm = () => {
  const dispatch = useDispatch();

  // Get route params (not used currently but available)
  const { id } = useParams();

    // Redux store data
  const { restaurant, ingredients, auth ,menu} = useSelector((store) => store);

  // Image upload loading state
  const [uploadImage, setUploadingImage] = useState("");

    // JWT token
  const jwt = localStorage.getItem("jwt");

  /* -------------------- FORMIK SETUP -------------------- */
  const formik = useFormik({
    initialValues,

    // Submit handler
    onSubmit: (values) => {

      // Attach restaurant ID before sending
      values.restaurantId = restaurant.usersRestaurant.id;

      // Dispatch create menu item action
      dispatch(createMenuItem({ menu: values, jwt: auth.jwt || jwt }));
      console.log("values ----- ", values);
    },
  });

  /* -------------------- IMAGE UPLOAD -------------------- */
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

      // Start loading
    setUploadingImage(true);

    // Upload to cloudinary
    const image = await uploadToCloudinary(file);

      // Add image to form array
    formik.setFieldValue("images", [...formik.values.images, image]);

     // Stop loading
    setUploadingImage(false);
  };

   /* -------------------- REMOVE IMAGE -------------------- */
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };


  // Snackbar open/close state
  const [openSnackBar, setOpenSnackBar] = useState(false);

  /* -------------------- SNACKBAR CONTROL -------------------- */
  useEffect(() => {
    if (menu.message || menu.error) setOpenSnackBar(true);
  }, [menu.message,menu.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <div className="AddMenuForm-container">
        <div>

          {/* -------------------- FORM TITLE -------------------- */}
          <h1 className="AddMenuForm-head">
            Add New Menu Item
          </h1>

           {/* -------------------- FORM START -------------------- */}
          <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <Grid container spacing={2}>

{/* -------------------- IMAGE UPLOAD SECTION -------------------- */}
              <Grid className="AddMenuForm-image" size= {12}>

                 {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

               {/* Upload button UI */}
                <label className="AddMenuForm-label" htmlFor="fileInput">
                  <span className="AddMenuForm-AddImage">
                    <AddPhotoAlternateIcon className="AddMenuform-text" />
                  </span>

                   {/* Loader when uploading */}
                  {uploadImage && (
                    <div className="AddMenuForm-progress">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                    {/* Preview uploaded images */}
                <div className="AddMenuForm-image-list">
                  {formik.values.images.map((image, index) => (
                    <div className="AddMenuForm-image-position">
                      <img
                        className="AddMenuForm-imageIndex"
                        key={index}
                        src={image}
                        alt={`ProductImage ${index + 1}`}
                      />

                      {/* Remove image button */}
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

              {/* -------------------- NAME -------------------- */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

               {/* -------------------- DESCRIPTION -------------------- */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>


            {/* -------------------- PRICE -------------------- */}
              <Grid size={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>

               {/* -------------------- CATEGORY -------------------- */}
              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="categoryId">Food Category</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    label="Food Category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    {restaurant.categories.map((item) => (
                      <MenuItem value={item}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* -------------------- INGREDIENTS MULTI SELECT -------------------- */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <InputLabel id="ingredient-multiple-chip-label">
                    Ingredients
                  </InputLabel>
                  <Select
                    labelId="ingredient-multiple-chip-label"
                    id="ingredient-multiple-chip"
                    multiple
                    name="ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Ingrededients"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value.id} label={value.name} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {ingredients.ingredients?.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item}
                        // style={getStyles(name, personName, theme)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* -------------------- VEG / NON VEG -------------------- */}
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="vegetarian">Is Vegetarian</InputLabel>
                  <Select
                    id="vegetarian"
                    name="vegetarian"
                    label="Is Vegetarian"
                    onChange={formik.handleChange}
                    value={formik.values.vegetarian}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


            {/* -------------------- SEASONAL -------------------- */}
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="seasonal">Is Seasonal</InputLabel>
                  <Select
                    id="seasonal"
                    name="seasonal"
                    label="Is Seasonal"
                    onChange={formik.handleChange}
                    value={formik.values.seasonal}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* -------------------- SUBMIT BUTTON -------------------- */}
            <Button variant="contained" color="primary" type="submit">
              Create Menu Item
            </Button>
          </form>
        </div>
      </div>

  {/* -------------------- SNACKBAR NOTIFICATIONS -------------------- */}
      <Snackbar
        sx={{ zIndex: 50 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        // handleClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={menu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {menu.message || auth.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMenuForm;