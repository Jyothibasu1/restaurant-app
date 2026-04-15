import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import { Grid } from "@mui/material";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import SellIcon from "@mui/icons-material/Sell";
// import FastfoodIcon from "@mui/icons-material/Fastfood";
import './RestaurantDashboard.css';

const RestaurantDashboard = () => {

   // getting restaurant id from URL
  const { id } = useParams();

  // getting restaurant data from redux
  const {restaurant}=useSelector(store=>store);

  console.log("restaurants id ", id); // checking id
  
  const dispatch = useDispatch();

  // calling API when component loads
  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: id,
        jwt: localStorage.getItem("jwt"), // token from local storage
      })
    );
  }, []);

  console.log("restaurant",restaurant)// checking data
  return (
    
    <div className="RestaurantDashboard-comp">
      
      {/* grid layout */}
      <Grid container spacing={1}>
      
        {/* orders table */}
        <Grid size={{ xs: 12, lg: 6 }} >
          <OrdersTable name={"Recent Order"} isDashboard={true} />
        </Grid>
        {/* menu items table */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDashboard;