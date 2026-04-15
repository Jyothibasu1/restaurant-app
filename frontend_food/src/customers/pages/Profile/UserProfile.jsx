import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../State/Authentication/Action';
import "./UserProfile.css"

const UserProfile = () => {
  const {auth}=useSelector(store=>store)
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogout=()=>{
    navigate("/")
    dispatch(logout());
  }
  return (
  
    <div className="profile-container">
  <div className="profile-card">
    <AccountCircleIcon className="profile-icon" />
    <h1 className="profile-name">{auth.user?.fullName}</h1>
    <p className="profile-email">Email : {auth.user?.email}</p>
    <Button onClick={handleLogout} className="profile-logout-btn" variant="contained">
      Logout
    </Button>
  </div>
</div>
  )
}

export default UserProfile