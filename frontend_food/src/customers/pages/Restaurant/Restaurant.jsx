import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import './Restaurant.css';

const categories = [
  "Thali",
  "Starters",
  "Indian Main Course",
  "Rice and Biryani",
  "Breads",
  "Accompaniments",
  "Dessert",
];

const foodTypes = [
  {label:"All",value:"all"},
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  {label:"Seasonal",value:"seasonal"},
  
];
const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(
      getRestaurantById({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
      })
    );
    dispatch(
      getMenuItemsByRestaurantId({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
        seasonal: foodType==="seasonal",
        vegetarian: foodType==="vegetarian",
        nonveg: foodType==="non_vegetarian",
        foodCategory: foodCategory || ""
      })
    );
    dispatch(getRestaurantsCategory({restaurantId:id,jwt}))
  }, [id,foodType,foodCategory]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <><div className="CPR-Con ">
      <section>
        <h3 className="CPR-details">
          Home/{restaurant.restaurant?.address.country}/
          {restaurant.restaurant?.name}/{restaurant.restaurant?.id}/Order Online
        </h3>
        <div>
         
          <Grid container spacing={2}>
            <Grid size={12}>
            <img
            className="CPR-Img"
            src={restaurant.restaurant?.images[0]}
            alt=""
          />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
            <img
            className="CPR-Img"
            src={restaurant.restaurant?.images[1]}
            alt=""
          />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
            <img
            className="CPR-Img"
            src={restaurant.restaurant?.images[2]}
            alt=""
          />
            </Grid>
          </Grid>
        </div>
         <div className="CPR-ResDtls">
          <h1 className="CPR-ResName">
            {restaurant.restaurant?.name}
          </h1>
           <p className="CPR-ResDes">{restaurant.restaurant?.description}</p>
          <div className="CPR-ResAddCon">
              <p className="CPR-ResAdd">
            <LocationOnIcon/> <span>{restaurant.restaurant?.address.streetAddress}
              </span> 
          </p>
          <p className="CPR-Info">
           <TodayIcon/> <span className="CPR-OpnHr"> {restaurant.restaurant?.openingHours} (Today)</span>
          </p>
          </div>
        
        </div>
      </section>
      <Divider />

      <section className="CPR-Sec2 ">
        <div className="CPR-FilterSide">
             <div className="CPR-FilterBox">
            <div className="">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Type
              </Typography>
              <FormControl className="CPR-FORMCon" component="fieldset">
                <RadioGroup
                  name="food_type"
                  value={foodType || "all"}
                  onChange={handleFilter}
                >
                  {foodTypes?.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
                <Divider/>
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Category
              </Typography>
                <RadioGroup
                  name="food_category"
                  value={foodCategory || "all"}
                  onChange={handleFilter}
                >
                   <FormControlLabel
                      
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                    />
                  {restaurant?.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="CPR-Mi">
          {menu?.menuItems.map((item) => (
            <MenuItemCard item={item} />
            // <p>ashok</p>
          ))}
        </div>
      </section>
    </div>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={menu.loading || restaurant.loading}
  
>
  <CircularProgress color="inherit" />
</Backdrop>
    </>
    
  );
};

export default Restaurant;