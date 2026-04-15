import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { logout } from "../State/Authentication/Action";
import Auth from "../customers/pages/Auth/Auth";
import { IconButton } from "@mui/material";
import './AdminNavbar.css';

const AdminNavbar = ({handleOpenSideBar}) => {
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  



  return (
    <div className="AN-con">
      <div className="AN-div">
        <div
          className="AN-headCon"
        >
          <IconButton onClick={handleOpenSideBar}><MenuIcon/></IconButton>
          <li className="AN-head">
            Famous Food
          </li>
        </div>
      </div>
      

    </div>
  );
};

export default AdminNavbar;