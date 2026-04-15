import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";
import './ProfilePage.css';

const Profile = () => {
  return (
    <div className="profile-page">
  <div className="sidebar">
    <ProfileNavigation />
  </div>
  <div className="main-content">
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/address" element={<UsersAddresses />} />
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/payments" element={<Orders />} />
      <Route path="/events" element={<CustomerEvents />} />
      <Route path="/notification" element={<Notifications />} />
    </Routes>
  </div>
</div>
  );
};

export default Profile;