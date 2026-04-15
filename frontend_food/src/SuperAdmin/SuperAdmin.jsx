import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import RestaurantTable from "./Restaurants/RestaurantTable";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import './SuperAdmin.css';

const SuperAdmin = () => {
  return (
    <div className="SuperAdmin-Con">
      <div className="">
       
        <SuperAdminSidebar />
      </div>

       <div className="SuperAdmin-div">
        <Routes>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path="/restaurants" element={<SuperAdminRestaurant/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;