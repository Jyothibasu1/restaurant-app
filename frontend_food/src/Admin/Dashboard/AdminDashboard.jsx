import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../../State/Customers/Restaurant/restaurant.action";
import AddressCard from "../../customers/components/Address/AddressCard";
import AddRestaurantCard from "./AddRestaurantCard";
import './AdminDashboard.css';


const AdminDashboard = () => {
  
  // getting params from URL (not used much here, just checking)
  const params = useParams();

   // getting restaurant data from redux store
  const {restaurant}=useSelector(state=>state);

  console.log("params", params);// just for checking
  const dispatch = useDispatch();

  // calling API when component loads
  useEffect(() => {
    dispatch(getRestaurantByUserId());
  }, []);

  return (
    <div className="admin-dashboard-container">
     
      {/* grid to show restaurant cards */}
      <div className="restaurant-cards-grid">

         {/* looping all restaurants */}
        {restaurant.usersRestaurant.map((item) => (
          <RestaurantCard item={item}/>
        ))}

        {/* if no restaurants, show add card */}
        {restaurant.usersRestaurant.length<1 && <AddRestaurantCard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
