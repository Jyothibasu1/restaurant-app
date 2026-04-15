import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dashboard } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import { logout } from "../State/Authentication/Action";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './SuperAdminSidebar.css';

const menu = [

  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Restaurants", icon: <ShoppingBagIcon />, path: "/restaurants" },
  { title: "Customers", icon: <ShopTwoIcon />, path: "/customers" },
  // { title: "Restaurant Request", icon: <AddCircleIcon />, path: "/restaurant-request" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];
export default function SuperAdminSidebar({ handleClose, open }) {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams()
  console.log("restaurantId ",id)

  const handleNavigate = (item) => {
    navigate(`/admin/super-admin${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    }
    
    
  };

  return (
    <div className=" ">
      {/* <React.Fragment> */}
        <Drawer
          sx={{ zIndex: 1 }}
          anchor={"left"}
          open={open}
          onClose={handleClose}
          variant={isSmallScreen ? "temporary" : "permanent"}
          // variant="persistent"
        >
          <div className="SASB-Con">
            <Divider  />
            {menu.map((item, i) => (
              <React.Fragment key={i}>
                <div
                  onClick={() => handleNavigate(item)}
                  className="SASB-Navigate"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <Divider />
              </React.Fragment>
            ))}
          </div>
        </Drawer>
      {/* </React.Fragment> */}
    </div>
  );
}